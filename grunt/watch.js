module.exports = {
    css: {
        files: [ 'css/**/*.scss' ],
        tasks: [ 'sass', 'autoprefixer' ]
    },
    js: {
        files: [ 'js/**/*.js', '!js/**/*.min.js' ],
        tasks: [ 'uglify' ]
    }
};
