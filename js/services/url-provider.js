/**
 * URLProvider
 *
 * Provides URLs for the API, and other end points.
 */

 angular.module('app').service('URLProvider', function() {

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
