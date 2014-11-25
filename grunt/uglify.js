module.exports = {
    build: {
        options: {
            mangle: false,
            sourceMap: true,
            wrap: true
        },
        files: {
            'js/app.min.js': [
                'js/modules/*.js',
                'js/services/*.js',
                'js/filters/*.js',
                'js/directives/*.js',
                'js/controllers/*.js'
            ]
        }
    }
};
