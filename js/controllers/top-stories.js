/**
 * TopStoriesCtrl
 *
 * Controller logic for the main view, triggers TopStories then closes the
 * connection when we have them all.
 *
 */
angular.module('app').controller('TopStoriesCtrl', function($scope, TopStories) {

    // Holds the top stories
    $scope.stories = [];

    // Fetch top stories
    TopStories.each(function(story) {
        $scope.stories.push(story);
    }).then(function() {
        TopStories.disconnect();
    });
});
