// generated on 2016-03-30 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import { stream as wiredep } from 'wiredep';

// https://www.npmjs.com/package/gulp-live-server
var gls = require('gulp-live-server');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


function lint(files, options) {
    return () => {
        return gulp.src(files)
            .pipe(reload({ stream: true, once: true }))
            .pipe($.eslint(options))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}
const testLintOptions = {
    env: {
        mocha: true
    }
};

gulp.task('lint', lint('server/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['lint'], () => {

    var server = gls.new('server/scripts/server.js');
    server.start();

    // gulp.watch([
    //   'server/**/*'
    // ]).on('change', reload);

    gulp.watch('server/**/*', function() {
        console.info('server changed, reloading');
        gulp.start('lint');
        server.start.bind(server)()
    });
});


gulp.task('default', ['clean'], () => {
    gulp.start('lint');
});
