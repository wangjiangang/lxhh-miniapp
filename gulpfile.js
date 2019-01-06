const gulp         = require('gulp');
const less         = require('gulp-less');
const rename       = require('gulp-rename');
const postcss      = require('gulp-postcss');
const cssnano      = require('gulp-cssnano');
const header       = require('gulp-header');
const autoprefixer = require('autoprefixer');
const eslint = require('gulp-eslint');

const pkg = require('./package.json');

/**
 * 通过 ESLint 检查代码
 */
gulp.task('build:lint', function() {
    gulp.src([
        'src/**/*.js',
        '!src/components/**/*.js'
    ])
        .pipe(eslint({
            configFile: './.eslintrc.js'
        }))
        .pipe(eslint.format());
});


gulp.task('watch', function() {
    gulp.watch('src/**', ['build:style', 'build:page']);
});

gulp.task('build:style', function() {
    var banner = [
        '/*!',
        ' * KOL v<%= pkg.version %> ',
        ' * Copyright <%= new Date().getFullYear() %> Wang jg, Inc.',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''
    ].join('\n');

    gulp
        .src(['src/pages/**/*.less',
            'src/components/**/*.less',
            'src/app.less',
            '!src/styles/',
            '!src/styles/**/*'],
        {base: 'src'})
        .pipe(less())
        .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
        .pipe(cssnano({
            zindex: false,
            autoprefixer: false,
            discardComments: {removeAll: true}
        }))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename(function(path) {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('dist'));
});


/**
 * 按 src 文档结构将所有内容拷贝到 dist 文件夹
 */
gulp.task('build:page', function() {
    gulp
        .src([
            'src/**/*',
            '!src/**/*.less',
            '!src/styles/',
            '!src/styles/**/*'],
        {base: 'src'})
        .pipe(rename(function(path) {
            if (path.extname === '.html') {
                path.extname = '.wxml';
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'build:style', 'build:page', 'build:lint']);

