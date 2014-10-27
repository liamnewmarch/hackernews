/**
 * domain
 *
 * Filter to get the domain name from a full URL string.
 *
 */
 angular.module('app').filter('domain', function () {
    return function(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    };
});
