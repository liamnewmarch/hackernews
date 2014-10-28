module.exports = {
    unit: {
        options: {
            basePath: '',
            frameworks: [ 'jasmine' ],
            files: [
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js',
                'https://cdn.firebase.com/js/client/1.0.21/firebase.js',
                'js/app.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-mocks.js',
                'js/test/unit/controllers/top-storiesSpec.js'
            ],
            'exclude': [],
            'preprocessors': {},
            'reporters': [ 'progress' ],
            'port': 9876,
            'colors': true,
            'autoWatch': true,
            'browsers': [ 'Chrome' ],
            'singleRun': true
        }
    }
};
