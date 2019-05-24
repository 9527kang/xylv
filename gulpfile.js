/*
 * @author: qiqin, coderqiqin@aliyun.com
 * @date: 2018-12-08更新
 * 'gulp': 开启任务
 * 'gulp build': 打包压缩文件并压缩图片
 */
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require("gulp-sourcemaps");
//压缩
var imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip');
//gulp报错-不退出任务
var plumber = require('gulp-plumber'),
    notify = require('gulp-notify');
//删除
var del = require('del');
/**************************************************/

//开启浏览器热刷新
gulp.task('server', function() {
  connect.server({
    root: 'dist',
    port: 8080,
    livereload: true
  });
});

//合并文件
gulp.task('fileinclude', function() {
  return gulp.src('src/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
//  .pipe(htmlmin({
//    minifyJS: true, //压缩页面JS
//    minifyCSS: true, //压缩页面css
//    removeComments: true,
//    collapseWhitespace: true,
//    removeScriptTypeAttributes: true
//  }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

//sass&scss编译
gulp.task('sass', function() {
  return gulp.src('src/css/**/*.+(scss|sass)')
        .pipe(plumber({
          errorHandler: notify.onError({
            title: 'sass Error',
            message: '<%= error.message %>'})
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer()) //自动补全厂商前缀
        .pipe(gulp.dest('src/css'))
        .pipe(cleanCSS())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'));
});

//拷贝css
gulp.task('copy-css', ['sass'], function() {
  return gulp.src('src/css/*.min.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

//图片压缩复制
gulp.task("copy-img", function() {
  return gulp.src('src/img/**/*.{jpg,png,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 5 //类型：Number  默认：3  取值范围：0-7（优化等级）
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload());
});

//拷贝js
gulp.task('copy-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

//组合任务
gulp.task('watch', function() {
  gulp.watch('src/css/**/*.+(scss|sass)', ['sass']);
  gulp.watch('src/css/*.css', ['copy-css']);
  gulp.watch('src/**/*.html', ['fileinclude']);
  gulp.watch('src/js/**/*.js', ['copy-js']);
});

gulp.task('default', ['fileinclude', 'sass', 'copy-css', 'copy-img', 'copy-js', 'server', 'watch'], function() {
  console.log('Gulp任务执行成功,开始撸代码!');
});

//执行删除dist文件夹
gulp.task('del', function() {
  return gulp.src('dist/*')
    .pipe(del());
});

//打包压缩文件
gulp.task('build', ['copy-img'], function() {
  return gulp.src('dist/**/*')
    .pipe(zip('project.zip'))
    .pipe(gulp.dest('./'))
});

//拷贝src文件夹下的文件到dist
//gulp.task('data', function() {
//	return gulp.src('src/**')
//		.pipe(gulp.dest('dist'));
//});

//gulp.task('jade',function () {
////	var data = require('./data.json');
//	gulp.src('src/*.jade')
//	.pipe(jade({
//		pretty:true
//	}))
//	.pipe(gulp.dest('dist'))
//});

//检测js代码错误
//gulp.task('jshint',function () {
//	return gulp.src('src/js/*.js')
//	.pipe(jshint())
//	.pipe(jshint.reporter());
//});