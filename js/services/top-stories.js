/**
 * TopStories
 *
 * Requests the top story IDs, then for each ID requests the story item, all
 * wrapped up in promises.
 */

 angular.module('app').service('TopStories', function($q, HackerNewsAPI, URLProvider) {

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
