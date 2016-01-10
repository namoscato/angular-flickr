'use strict';

var addStream = require('add-stream'),
    gulp = require('gulp'),
    gulpAngularTemplateCache = require('gulp-angular-templatecache'),
    gulpConcat = require('gulp-concat'),
    gulpCssnano = require('gulp-cssnano'),
    gulpHelp = require('gulp-help')(gulp),
    gulpNgAnnotate = require('gulp-ng-annotate'),
    gulpRename = require('gulp-rename'),
    gulpSass = require('gulp-sass'),
    gulpTypescript = require('gulp-typescript'),
    gulpTsLint = require('gulp-tslint'),
    gulpUglify = require('gulp-uglify'),
    gulpWebserver = require('gulp-webserver');

var css = {
    src: 'src/content/styles/app.scss',
    dest: 'src/dist/css'
};

var js = {
    src: {
        app: [
            'typings/**/*.d.ts',
            'src/lib/**/*.module.ts',
            'src/app/**/*.module.ts',
            'src/lib/**/*.ts',
            'src/app/**/*.ts'
        ],
        libs: 'node_modules/angular/angular.js',
        templates: 'src/lib/**/*.html'
    },
    dest: 'src/dist/js'
};

var tsProject = gulpTypescript.createProject({
    noImplicitAny: true,
    noExternalResolve: true,
    out: 'app.js',
    typescript: require('typescript')
});

gulp.task('all', 'Build application', [
    'css',
    'js:app',
    'js:libs',
    'js:lint'
]);

gulp.task('css', 'Compile application SASS', function() {
    gulp.src(css.src)
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpCssnano())
        .pipe(gulp.dest(css.dest));
});

gulp.task('js:app', 'Compile application JavaScript', function() {
    var stream = gulp.src(js.src.app)
        .pipe(gulpTypescript(tsProject))
        .pipe(gulpNgAnnotate())
        .pipe(addStream.obj(gulp.src(js.src.templates)
            .pipe(gulpAngularTemplateCache('templates.js', {
                module: 'amo.flickr.core',
                root: 'flickr'
            })
        )));

    return compileJavaScript(stream, 'app');
});

gulp.task('js:libs', 'Compile third party JavaScript', function() {
    return compileJavaScript(gulp.src(js.src.libs), 'vendor');
});

gulp.task('js:lint', 'Check for JavaScript code quality', function() {
    gulp.src('src/app/**/*.ts')
        .pipe(gulpTsLint())
        .pipe(gulpTsLint.report('verbose'));
});

gulp.task('serve', 'Run a local webserver', function() {
    gulp.src('src')
        .pipe(gulpWebserver({
            fallback: 'index.html',
            livereload: false,
            open: true
        }));
});

gulp.task('watch', 'Watch for changes and recompile', ['all'], function() {
    gulp.watch([
        'src/app/**/*.ts',
        'src/lib/**/*.ts',
    ], [
        'js:app',
        'js:lint'
    ]);

    gulp.watch(['src/lib/**/*.html'], [
        'js:app'
    ]);

    gulp.watch(['node_modules/**/*.js'], [
        'js:libs'
    ]);

    gulp.watch(['src/content/styles/**/*.scss'], [
        'css'
    ]);
});

/**
 * @name compileJavaScript
 * @param {Object} stream Stream object
 * @param {String} name Name of output file
 */
function compileJavaScript(stream, name) {
    return stream
        .pipe(gulpConcat(name + '.js'))
        .pipe(gulpUglify({
            compress: false,
            mangle: false
        }))
        .pipe(gulpRename(name + '.min.js'))
        .pipe(gulp.dest(js.dest));
}
