import gulp from 'gulp';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import gulprun from 'run-sequence';
import fs from 'fs';
import yargs from 'yargs';
import browserSync from 'browser-sync';
import inky from 'inky';
import inlineCSS from 'gulp-inline-css';
import minify from 'gulp-htmlmin';
import email from 'gulp-email';
import mailgun from 'gulp-mailgun';

const bs = browserSync.create(),
      argv = yargs.argv,
      errorNotifier = () => plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
      OPTIONS = {
        HTMLmin: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          caseSensitive: true,
          keepClosingSlash: true,
          minifyCSS: true
        },
        browserSync: {
          server: {
            baseDir: '.',
            index: 'email.html'
          },
          open: false,
          notify: false
        }
      };

gulp.task('build', () => {
  return gulp.src(['src/email.html'])
          .pipe(errorNotifier())

          .pipe(inky())
          .pipe(inlineCSS())
          .pipe(gulpif(!argv.debug, minify(OPTIONS.HTMLmin)))

          .pipe(gulp.dest('.'))
});

gulp.task('test', () => {
  const MAILGUN = JSON.parse(fs.readFileSync('./.mailgun.json'));

  return gulp.src(['./email.html'])
          .pipe(mailgun({
            key: MAILGUN.api,
            sender: 'Email Test <test@email.com>',
            recipient: argv.email,
            subject: 'This is a test'
          }));
});

gulp.task('serve', () => bs.init(OPTIONS.browserSync));
gulp.task('refresh', () => bs.reload());

gulp.task('watch', () => {
  gulp.watch(`src/**/*`, () => gulprun(`build`, 'refresh'));
});

gulp.task('default', ['build', 'serve', 'watch']);
