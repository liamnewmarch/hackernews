/**
 * TopStoriesCtrl
 *
 * Controller logic for the main view, triggers TopStories then closes the
 * connection when we have them all.
 *
 */

(function() {
    'use strict';

    function TopStoriesCtrl($scope, $window, TopStories, KeyHandler) {

        $scope.index = -1;

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

        $scope.keyHandler = KeyHandler.on({
            13: function() { // return
                if ($scope.index >= 0) {
                    $window.location.href = $scope.filtered[$scope.index].url;
                }
            },
            38: function() { // up
                $scope.index = Math.max(0, $scope.index - 1);
            },
            40: function() { // down
                $scope.index = Math.min($scope.filtered.length - 1, $scope.index + 1);
            }
        });

        $scope.$watch('index', function() {
            var selector, element;
            if ($scope.index >= 0) {
                selector = '.story:nth-of-type(' + ($scope.index + 1) + ')';
                element = $window.document.querySelector(selector);
                $window.scrollTo(0, element.offsetTop - ($window.innerHeight / 2));
            }
        });
    }

    TopStoriesCtrl.$inject = [ '$scope', '$window', 'TopStories', 'KeyHandler' ];

    angular.module('app').controller('TopStoriesCtrl', TopStoriesCtrl);

}());
