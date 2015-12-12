'use strict';
import gulp  from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import PrettyError from 'pretty-error';
import clear from 'clear';
import del from 'del';
import runSequence from 'run-sequence';
import babelCompiler from 'babel-core/register';
//import manifest  from './package.json';
new PrettyError.start();

const {
  babel,
  eslint,
  mocha
} = gulpLoadPlugins();

const srcFilesPattern  = 'src-es6/**/*.js';
const testFilesPattern = 'tests/**/*.js';
const jsTargetFolder = 'src';

gulp.task('clean', () => del([jsTargetFolder]));

gulp.task('lint', () => {
  return gulp.src([srcFilesPattern, testFilesPattern])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

gulp.task('transpile', () => {
  return gulp.src(srcFilesPattern)
  .pipe(babel())
  .pipe(gulp.dest(jsTargetFolder));
});

gulp.task('test', () => {
  return gulp.src(testFilesPattern)
  .pipe(mocha({ 
    reporter: 'spec',
    compilers: {
      js: babelCompiler
    },
  }));
});

const runDevelopmentTasks = () => {
    return runSequence('clean', ['lint', 'transpile', 'test']);
};

gulp.task('build', () => runDevelopmentTasks());

gulp.task('dev', ['build'], () => {
  return gulp.watch([srcFilesPattern, testFilesPattern], () => {
    clear();
    runDevelopmentTasks();
  });
});

