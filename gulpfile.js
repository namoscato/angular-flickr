'use strict';

var addStream = require('add-stream'),
    del = require('del'),
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
    gulpWebserver = require('gulp-webserver'),
    streamqueue = require('streamqueue');

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
    gulp.src('src/content/styles/app.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpCssnano())
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('js:app', 'Compile application JavaScript', function() {
    var stream = streamqueue({objectMode: true},
        gulp.src('typings/**/*.d.ts'),
        gulp.src('src/lib/**/*.module.ts'),
        gulp.src('src/app/**/*.module.ts'),
        gulp.src([
            'src/lib/**/*.ts',
            'src/app/**/*.ts',
            '!src/lib/**/*.module.ts',
            '!src/app/**/*.module.ts'
        ]))
        .pipe(gulpTypescript(tsProject))
        .pipe(gulpNgAnnotate())
        .pipe(addStream.obj(gulp.src('src/lib/**/*.html')
            .pipe(gulpAngularTemplateCache('templates.js', {
                module: 'amo.flickr.core',
                root: 'flickr'
            })
        )));

    return compileJavaScript(stream, 'app');
});

gulp.task('js:libs', 'Compile third party JavaScript', function() {
    return compileJavaScript(gulp.src('bower_components/angular/angular.js'), 'vendor');
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
    gulp.watch(['src/app/**/*.ts'], [
        'js:app',
        'js:lint'
    ]);

    gulp.watch(['src/app/**/*.html'], [
        'js:app'
    ]);

    gulp.watch(['bower_components/**/*.js'], [
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
        .pipe(gulp.dest('src/dist/js'));
}
