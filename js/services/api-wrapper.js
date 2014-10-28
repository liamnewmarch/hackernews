/**
 * HackerNewsAPI
 *
 * Handles connection and requests to the API.
 *
 */

HackerNews.service('APIWrapper', function($window, $q) {

    // Request a specific url and return a promise
    this.fetch = function(url) {
        var connection, onValue;

        return $q(function(resolve) {

            connection = new $window.Firebase(url);
            onValue = connection.on('value', function(snapshot) {
                resolve(snapshot);
                connection.off('value', onValue);
            });
        });
    };

    // Close the API connection
    this.disconnect = function() {
        $window.Firebase.goOffline();
    };
});
