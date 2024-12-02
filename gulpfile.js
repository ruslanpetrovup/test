const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

// Пути
const paths = {
  src: {
    pug: 'src/pug/*.pug',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*.*'
  },
  dist: {
    html: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/images'
  },
  watch: {
    pug: 'src/pug/**/*.pug',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*.*'
  }
};

// Очистка dist
function cleanDist() {
  return gulp.src('dist', {allowEmpty: true})
    .pipe(clean());
}

// PUG
function pugTask() {
  return gulp.src(paths.src.pug)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream());
}

// SCSS
function scssTask() {
  return gulp.src(paths.src.scss)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// JavaScript
function jsTask() {
  return gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
}

// Images
function imagesTask() {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.images))
    .pipe(browserSync.stream());
}

// Watch
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false,
    port: 3000
  });

  gulp.watch(paths.watch.pug, pugTask);
  gulp.watch(paths.watch.scss, scssTask);
  gulp.watch(paths.watch.js, jsTask);
  gulp.watch(paths.watch.images, imagesTask);
}

// Tasks
exports.clean = cleanDist;
exports.build = gulp.series(
  cleanDist,
  gulp.parallel(pugTask, scssTask, jsTask, imagesTask)
);
exports.default = gulp.series(
  cleanDist,
  gulp.parallel(pugTask, scssTask, jsTask, imagesTask),
  watchTask
);