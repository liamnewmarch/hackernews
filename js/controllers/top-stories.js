/**
 * TopStoriesCtrl
 *
 * Controller logic for the main view, triggers TopStories then closes the
 * connection when we have them all.
 *
 */

(function() {

    'use strict';

    function TopStoriesCtrl($scope, TopStories) {

        $scope.status = 'Loading';

        // Holds the top stories
        $scope.stories = [];

        // Fetch top stories
        TopStories.each(function(story) {
            $scope.stories.push(story);
        }).then(function() {
            TopStories.disconnect();
        }).catch(function() {
            $scope.status = 'Error loading stories';
            console.log('The API returned an error');
        });
    }

    TopStoriesCtrl.$inject = [ '$scope', 'TopStories' ];

    angular.module('app').controller('TopStoriesCtrl', TopStoriesCtrl);

}());
