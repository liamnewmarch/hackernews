(function() {

    'use strict';

    var App = angular.module('app', ['firebase']);

    App.controller('TopStoriesCtrl', function($scope, $firebase) {

        var baseUrl = 'https://hacker-news.firebaseio.com/v0/';
        var topReference = new Firebase(baseUrl + 'topstories');

        $scope.stories = [];

        var listener = topReference.on('value', function(topSnapshot) {

            var top = topSnapshot.val();
            angular.forEach(top, function(id) {

                var storyReference = new Firebase(baseUrl + 'item/' + id);
                storyReference.on('value', function(storySnapshot) {

                    var story = storySnapshot.val();
                    story.date = new Date(story.time * 1000);

                    $scope.stories.push(story);
                    $scope.$apply();
                });
            });

            topReference.off('value', listener);
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
