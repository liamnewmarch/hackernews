/**
 * TopStories
 *
 * Requests the top story IDs, then for each ID requests the story item, all
 * wrapped up in promises.
 */

(function() {
    'use strict';

    angular.module('app').service('TopStories', TopStories);

    TopStories.$inject = [
        '$q',
        'APIWrapper',
        'URLProvider'
    ];

    function TopStories($q, APIWrapper, URLProvider) {

        // Fetch the top stories and triggers fetchStory for each one
        function fetchTop(onStory, onDone, onError) {
            APIWrapper.fetch(URLProvider.top()).then(function(snapshot) {
                var promises = [];

                angular.forEach(snapshot.val(), function(id) {
                    var promise = $q(function(resolve, reject) {
                        fetchStory(id, resolve);
                    });
                    promise.then(onStory);
                    promises.push(promise);
                });

                $q.all(promises).then(onDone).catch(onError);
            }).catch(onError);
        }

        // Fetch the story item for a given ID
        function fetchStory(id, onStory) {
            APIWrapper.fetch(URLProvider.item(id)).then(function(snapshot) {
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
            return $q(function(resolve, reject) {
                fetchTop(function(story) {
                    onStory(story);
                }, resolve, reject);
            });
        };

        // Provides a controller hook to close the connection
        this.disconnect = function() {
            APIWrapper.disconnect();
        };
    }

}());
