/**
 * HackerNewsAPI
 *
 * Handles connection and requests to the API.
 *
 */

(function() {
    'use strict';

    angular.module('app').service('APIWrapper', APIWrapper);

    APIWrapper.$inject = [ '$window', '$q' ];

    function APIWrapper($window, $q) {

        // Request a specific url and return a promise
        this.fetch = function(url) {
            var connection, onValue;

            return $q(function(resolve, reject) {

                connection = new $window.Firebase(url);
                onValue = connection.on('value', function(snapshot) {
                    resolve(snapshot);
                    connection.off('value', onValue);
                }, reject);
            });
        };

        // Close the API connection
        this.disconnect = function() {
            $window.Firebase.goOffline();
        };
    }

}());
