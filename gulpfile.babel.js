'use strict';
import gulp  from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import PrettyError from 'pretty-error';
import clear from 'clear';
import del from 'del';
import runSequence from 'run-sequence';
//import manifest  from './package.json';
new PrettyError.start();

const {
  babel,
  eslint
} = gulpLoadPlugins();

const srcFilesPattern  = 'src-es6/**/*.js';
const jsTargetFolder = 'src';

gulp.task('lint', () => {
  return gulp.src(srcFilesPattern)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

gulp.task('transpile', () => {
  return gulp.src(srcFilesPattern)
  .pipe(babel())
  .pipe(gulp.dest(jsTargetFolder));
});

gulp.task('clean', () => del([jsTargetFolder]));

const runDevelopmentTasks = () => {
    runSequence('clean', ['lint', 'transpile']);
};

gulp.task('build', () => runDevelopmentTasks());

gulp.task('dev', ['build'], () => {
  gulp.watch(srcFilesPattern, () => {
    clear();
    runDevelopmentTasks();
  });
});

