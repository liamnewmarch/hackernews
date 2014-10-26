(function() {

    'use strict';


    var HackerNews = angular.module('app', ['firebase']);


    /**
     * URLProvider
     *
     * Provides URLs for the API, and other end points.
     */

    HackerNews.service('URLProvider', function() {

        // Base URLs
        var baseAPI = 'https://hacker-news.firebaseio.com/v0/',
            baseHN = 'https://news.ycombinator.com/';

        // A story, comment, poll, etc
        this.item = function(id) {
            return baseAPI + 'item/' + id;
        };

        // Array of top story IDs
        this.top = function() {
            return baseAPI + 'topstories';
        };

        // View an item on HN
        this.view = function(id) {
            return baseHN + 'item?id=' + id;
        };

        // Cast a vote on HN (requires login)
        this.vote = function(id) {
            return baseHN + 'vote?for=' + id + '&dir=up&whence=news';
        };
    });


    /**
     * HackerNewsAPI
     *
     * Handles connection and requests to the API.
     *
     */
    HackerNews.service('HackerNewsAPI', function($firebase, $q) {

        // Request a specific url and return a promise
        this.fetch = function(url) {
            var connection, onValue;

            return $q(function(resolve) {

                connection = new Firebase(url);
                onValue = connection.on('value', function(snapshot) {
                    resolve(snapshot);
                    connection.off('value', onValue);
                });
            });
        };

        // Close the API connection
        this.disconnect = function() {
            Firebase.goOffline();
        };
    });


    /**
     * TopStories
     *
     * Requests the top story IDs, then for each ID requests the story item, all
     * wrapped up in promises.
     */

    HackerNews.service('TopStories', function($q, HackerNewsAPI, URLProvider) {

        // Fetch the top stories and triggers fetchStory for each one
        function fetchTop(onStory, onDone) {
            HackerNewsAPI.fetch(URLProvider.top()).then(function(snapshot) {
                var promises = [];

                angular.forEach(snapshot.val(), function(id) {
                    var promise = $q(function(resolve) {
                        fetchStory(id, resolve);
                    });
                    promise.then(onStory);
                    promises.push(promise);
                });

                $q.all(promises).then(onDone);
            });
        }

        // Fetch the story item for a given ID
        function fetchStory(id, onStory) {
            HackerNewsAPI.fetch(URLProvider.item(id)).then(function(snapshot) {
                var story = snapshot.val();

                // JS expects miliseconds but the API provides seconds
                story.date = new Date(story.time * 1000);

                // If this story has text update it’s url to point back to HN
                if (story.text) {
                    story.url = URLProvider.view(story.id);
                }

                onStory(story);
            });
        }

        // Provides a controller hook to listen for individual story loads
        this.each = function(onStory) {
            return $q(function(resolve) {
                fetchTop(function(story) {
                    onStory(story);
                }, resolve);
            });
        };

        // Provides a controller hook to close the connection
        this.disconnect = function() {
            HackerNewsAPI.disconnect();
        };
    });

    /**
     * TopStoriesCtrl
     *
     * Controller logic for the main view, triggers TopStories then closes the
     * connection when we have them all.
     *
     */
    HackerNews.controller('TopStoriesCtrl', function($scope, TopStories) {

        // Holds the top stories
        $scope.stories = [];

        // Fetch top stories
        TopStories.each(function(story) {
            $scope.stories.push(story);
        }).then(function() {
            TopStories.disconnect();
        });
    });


    /**
     * domain
     *
     * Filter to get the domain name from a full URL string.
     *
     */
    HackerNews.filter('domain', function () {
        return function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hostname;
        };
    });

}());
