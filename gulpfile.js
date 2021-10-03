var gulp        = require('gulp'),
    cssmin      = require('gulp-cssmin'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del'),
    htmlmin     = require('gulp-htmlmin'),
    terser      = require('gulp-terser');

var paths = {
  dest: 'dist/',
  js: {
    input: [
      '**/**/*.js',
      '!node_modules/**',
      '!assets/**',
      '!gulpfile.js',
      '!dist/**'
    ]
  },
  pagesPath: [
    'pages/**/*'
  ],
  modelsPath: [
    'models/**/*'
  ],
  fontsPath: [
    'fonts/**/*'
  ],
  svgPath: [
    'assets/svg/**/*'
  ],
}

function cleanDist() {
  return del(paths.dest, {force:true});
};

// Configure CSS tasks.
function css() {
  return gulp.src('pages/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/pages'));
};

function html() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dest));
}

// Configure JS.
function js() {
  return gulp.src(paths.js.input)
    .pipe(terser())
    .pipe(gulp.dest(paths.dest));
};

// Configure image stuff.
function images() {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
};

function pagesFolderTransfer() {
  return gulp.src(paths.pagesPath)
             .pipe(gulp.dest('dist/pages'));
}

function modelsFolderTransfer() {
  return gulp.src(paths.modelsPath)
             .pipe(gulp.dest('dist/models'));
}

function fontsFolderTransfer() {
  return gulp.src(paths.fontsPath)
             .pipe(gulp.dest('dist/fonts'));
}

function svgFolderTransfer() {
  return gulp.src(paths.svgPath)
             .pipe(gulp.dest('dist/assets/svg'));
}

exports.default = gulp.series(
  cleanDist,
  pagesFolderTransfer,
  modelsFolderTransfer,
  fontsFolderTransfer,
  svgFolderTransfer,
	gulp.parallel(
    html,
    css,
		js
  )
)