/**
 * HackerNewsAPI
 *
 * Handles connection and requests to the API.
 *
 */

HackerNews.service('HackerNewsAPI', function($firebase, $q) {

    // Request a specific url and return a promise
    this.fetch = function(url) {
        var connection, onValue;

        return $q(function(resolve) {

            connection = new Firebase(url);
            onValue = connection.on('value', function(snapshot) {
                resolve(snapshot);
                connection.off('value', onValue);
            });
        });
    };

    // Close the API connection
    this.disconnect = function() {
        Firebase.goOffline();
    };
});
