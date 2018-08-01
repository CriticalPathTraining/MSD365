var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');


gulp.task('sass', function() {
  gulp.src('app/scss/styles.scss') // Gets the styles.scss file
    .pipe(sass()) // Passes it through a gulp-sass task
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('serve', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/styles.scss', ['sass']);
  gulp.watch('app/index.html', browserSync.reload);
});