var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemap = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var reload = browserSync.reload;

gulp.task('sass', function () {
  return gulp
  .src('src/style.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 version']
  }))
  .pipe(sourcemap.init())  
  .pipe(gulp.dest('.tmp'))
  .pipe(sourcemap.write())
  .pipe(reload({ stream: true }));
});

gulp.task('sass:prod', function () {
  return gulp
  .src('src/style.sass')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 version'],
    cascade: false
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('pug', function () {
  return gulp
  .src('src/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('.tmp'));
});

gulp.task('pug:prod', function () {
  return gulp
  .src('src/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/style.sass', ['sass']);
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('.tmp/*.html').on('change', reload);
});

gulp.task('serve', ['sass', 'pug'], function () {
  browserSync({
    server: {
      baseDir: ['.tmp', 'src'] 
    }
  });

  gulp.start('watch');
});

gulp.task('build', ['sass:prod', 'pug:prod']);

gulp.task('default', ['sass']);