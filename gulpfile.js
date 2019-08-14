const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const concatCss = require("gulp-concat-css");

// Copy all html files
gulp.task("copyHtml", function(done) {
  gulp.src("static/*.html").pipe(gulp.dest("dist"));
  done();
});

// Image optimization
gulp.task("imageMin", () =>
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
    .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
);

// Compile sass
gulp.task("sass", function(done) {
  gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
  done();
});

// Concat css
gulp.task("concatCss", function(done) {
  gulp
    .src("css/*.css")
    .pipe(concat("main.css"))
    .pipe(gulp.dest("dist/css"));
  done();
});

// Scripts
gulp.task("scripts", function(done) {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
  done();
});

gulp.task(
  "default",
  gulp.parallel("copyHtml", "sass", "imageMin", "scripts", "concatCss")
);

gulp.task("watch", function(done) {
  gulp.watch("static/*.html", gulp.series("copyHtml"));
  gulp.watch("src/images/*", gulp.series("imageMin"));
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/js/*.js", gulp.series("scripts"));
  gulp.watch("css/*.css", gulp.series("concatCss"));
  done();
});
