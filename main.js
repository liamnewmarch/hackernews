(function() {

    'use strict';

    var url = {
        base: 'https://news.ycombinator.com/',
        api: 'https://hacker-news.firebaseio.com/v0/'
    };

    var App = angular.module('app', ['firebase']);

    App.controller('TopStoriesCtrl', function($scope, $firebase, $q) {

        var topListener, topReference;

        $scope.stories = [];
        topReference = new Firebase(url.api + 'topstories');

        topListener = topReference.on('value', function(topSnapshot) {

            var promises = [],
                top = topSnapshot.val();

            angular.forEach(top, function(id) {

                promises.push($q(function(resolve) {

                    var storyListener,
                        storyReference = new Firebase(url.api + 'item/' + id);

                    storyListener = storyReference.on('value', function(storySnapshot) {

                        var story = storySnapshot.val();

                        story.date = new Date(story.time * 1000);
                        $scope.stories.push(story);
                        $scope.$apply();

                        if (story.text) {
                            story.url = url.base + 'item?id=' + story.id;
                        }

                        storyReference.off('value', storyListener);
                        resolve();
                    });
                }));
            });

            $q.all(promises).then(function() {
                Firebase.goOffline();
            });

            topReference.off('value', topListener);
        });
    });

    App.filter('domain', function () {
        return function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hostname;
        };
    });

}());
