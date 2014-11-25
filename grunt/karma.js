module.exports = {
    unit: {
        options: {
            basePath: '',
            frameworks: [ 'jasmine' ],
            files: [
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-aria.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-mocks.js',
                'https://cdn.firebase.com/js/client/1.0.21/firebase.js',
                'js/app.min.js',
                'js/test/unit/app.js'
            ],
            'exclude': [],
            'preprocessors': {},
            'reporters': [ 'story', 'progress' ],
            'port': 9876,
            'colors': true,
            'autoWatch': true,
            'browsers': [ 'PhantomJS' ],
            'singleRun': true
        }
    }
};
