'use strict';

import babelCompiler   from 'babel-core/register';
import clear           from 'clear';
import del             from 'del';
import gulp            from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence     from 'run-sequence';
import PrettyError     from 'pretty-error';
import { Instrumenter } from 'isparta';

PrettyError.start();

const {
  babel,
  eslint,
  istanbul,
  mocha,
} = gulpLoadPlugins();

const srcFilesPattern  = 'src/**/*.js';
const testFilesPattern = 'tests/**/*.js';
const jsTargetFolder   = 'dist';

gulp.task('clean', () => del([jsTargetFolder, 'coverage']));

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

const testFn = () => {
  return gulp.src(testFilesPattern)
  .pipe(mocha({ 
    reporter: 'spec',
    compilers: {
      js: babelCompiler
    },
  }));
};

gulp.task('test', () => testFn());

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

gulp.task('coverage', ['lint'], () => {
  babelCompiler();
  return gulp.src([srcFilesPattern])
    .pipe(istanbul({
      instrumenter: Instrumenter,
	  includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
	.on('finish', () => {
		testFn()
		.pipe(istanbul.writeReports({
			reporters: ['text', 'text-summary', 'json', 'html', 'lcov']
		}))
	});
});
