(function() {

    'use strict';

    var HackerNews = angular.module('app', ['firebase']);

    HackerNews.service('URLProvider', function() {
        var baseAPI = 'https://hacker-news.firebaseio.com/v0/',
            baseHN = 'https://news.ycombinator.com/';

        this.item = function(id) {
            return baseAPI + 'item/' + id;
        };

        this.top = function() {
            return baseAPI + 'topstories';
        };

        this.view = function(id) {
            return baseHN + 'item?id=$1';
        };

        this.vote = function(id) {
            return baseHN + 'vote?for=' + id + '&dir=up&whence=news';
        };
    });

    HackerNews.service('HackerNewsAPI', function($firebase, $q) {
        this.fetch = function(url) {
            var promise, connection, onValue;

            return $q(function(resolve) {

                connection = new Firebase(url);
                onValue = connection.on('value', function(snapshot) {
                    resolve(snapshot);
                    connection.off('value', onValue);
                });
            });
        };

        this.disconnect = function() {
            Firebase.goOffline();
        };
    });

    HackerNews.service('TopStories', function($q, HackerNewsAPI, URLProvider) {

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

        function fetchStory(id, onStory) {

            HackerNewsAPI.fetch(URLProvider.item(id)).then(function(snapshot) {
                var story = snapshot.val();

                story.date = new Date(story.time * 1000);

                if (story.text) {
                    story.url = URLProvider.view(story.id);
                }

                onStory(story);
            });
        }

        this.each = function(onStory) {
            return $q(function(resolve) {
                fetchTop(function(story) {
                    onStory(story);
                }, resolve);
            });
        };

        this.disconnect = function() {
            HackerNewsAPI.disconnect();
        };
    });

    HackerNews.controller('TopStoriesCtrl', function($scope, TopStories) {

        $scope.stories = [];
        TopStories.each(function(story) {
            $scope.stories.push(story);
        }).then(function() {
            TopStories.disconnect();
        });
    });

    HackerNews.filter('domain', function () {
        return function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hostname;
        };
    });

}());
