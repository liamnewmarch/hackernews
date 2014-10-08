(function() {

    'use strict';

    var App = angular.module('app', ['ngRoute', 'ngResource']);

    App.factory('url', function() {
        var base = 'https://hacker-news.firebaseio.com/v0/',
            format = '.json';

        return {
            top: base + 'topstories' + format,
            story: base + 'item/:id' + format
        };
    });

    App.controller('TopStoriesCtrl', function($scope, $resource, url) {

        var Top = $resource(url.top, null, { get: { isArray: true }});
        var Story = $resource(url.story, { id: '@id' });

        $scope.title = 'Top';
        $scope.stories = [];

        Top.get(function(stories) {
            angular.forEach(stories, function(id) {
                Story.get({ id: id }, function(story) {
                    story.date = new Date(story.time * 1000);
                    $scope.stories.push(story);
                });
            });
        });
    });

}());
