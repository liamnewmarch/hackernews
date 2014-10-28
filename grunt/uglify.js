module.exports = {
    build: {
        options: {
            mangle: false,
            sourceMap: true,
            wrap: true
        },
        files: {
            'js/app.min.js': [
                'js/modules/hacker-news.js',
                'js/services/url-provider.js',
                'js/services/api-wrapper.js',
                'js/services/top-stories.js',
                'js/controllers/top-stories.js',
                'js/filters/domain.js'
            ]
        }
    }
};
