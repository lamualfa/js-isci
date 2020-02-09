const gulp = require('gulp');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const vinylBuffer = require('vinyl-buffer');
const vinylSourceStream = require('vinyl-source-stream');
const sourceMaps = require('gulp-sourcemaps');
const stripComments = require('gulp-strip-comments');
const header = require('gulp-header');
const babel = require('gulp-babel');
const mergeStream = require('merge-stream');
const { join } = require('path');
const { basename } = require('path');
const { pipeline } = require('readable-stream');
const { default: uglifyEs } = require('gulp-uglify-es');

const pkg = require('./package.json');
const headerComment = `
/**
* ${pkg.name} - ${pkg.description}
* @version ${pkg.version}
* @link ${pkg.homepage}
* @license ${pkg.license}
* @copyright © 2020 - Laode Muhammad Al Fatih
* @author ${pkg.author}
*/
`.trimLeft();

const srcDirDraft1 = './draft-1';
const destDirDraf1 = './draft-1/dist';

gulp.task('es:draft-1', function() {
  const targets = [
    'mutable.js',
    'immutable.js',
    'light-mutable.js',
    'light-immutable.js'
  ].map(v => join(srcDirDraft1, v));

  const tasks = targets.map(v => {
    let newBaseName = basename(v);
    newBaseName = newBaseName.split('.');
    newBaseName.pop();
    newBaseName = newBaseName.join('.');

    return pipeline(
      browserify({
        entries: v,
        standalone: 'isci'
      }).bundle(),
      vinylSourceStream(`${newBaseName}.min.js`),
      vinylBuffer(),
      sourceMaps.init(),
      uglifyEs(),
      stripComments(),
      header(headerComment),
      sourceMaps.write('.'),
      gulp.dest(join(destDirDraf1, 'es'))
    );
  });

  return mergeStream(tasks);
});

gulp.task('js:draft-1', function() {
  const targets = [
    'mutable.js',
    'immutable.js',
    'light-mutable.js',
    'light-immutable.js'
  ].map(v => join(srcDirDraft1, v));

  const tasks = targets.map(v => {
    let newBaseName = basename(v);
    newBaseName = newBaseName.split('.');
    newBaseName.pop();
    newBaseName = newBaseName.join('.');

    return pipeline(
      browserify({
        entries: v,
        standalone: 'isci'
      }).bundle(),
      vinylSourceStream(`${newBaseName}.min.js`),
      vinylBuffer(),
      sourceMaps.init(),
      babel({
        presets: ['@babel/preset-env']
      }),
      uglify(),
      stripComments(),
      header(headerComment),
      sourceMaps.write('.'),
      gulp.dest(join(destDirDraf1, 'js'))
    );
  });

  return mergeStream(tasks);
});

gulp.task('build', gulp.parallel('es:draft-1', 'js:draft-1'));
