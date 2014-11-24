/**
 * KeyHandler
 *
 * Provides a clean way of registering a function to a key.
 */

(function() {

    'use strict';

    function KeyHandler() {

        var map = {};

        this.on = function(_map) {
            map = angular.extend(map, _map);
            return function(e) {
                if (e.which in map) {
                    e.preventDefault();
                    map[e.which]();
                }
            };
        };

        this.off = function(key) {
            if (e.which in map) {
                delete map[e.which];
            }
        };
    }

    angular.module('app').service('KeyHandler', KeyHandler);

}());