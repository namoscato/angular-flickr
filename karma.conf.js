module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/dist/js/vendor.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/dist/js/app.min.js',
            'tests/**/*.spec.js',
        ],
        exclude: [],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
}
