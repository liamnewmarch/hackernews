/**
 * domain
 *
 * Filter to get the domain name from a full URL string.
 *
 */

(function() {
    'use strict';

    angular.module('app').filter('domain', domain);

    function domain() {
        return function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hostname;
        };
    }

}());
