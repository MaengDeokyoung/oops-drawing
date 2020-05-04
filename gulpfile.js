var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');


// gulp.task(name, deps, func)
// name - task의 이름을 지정하고, 이름에는 공백이 포함되어서는 안됩니다.
// deps - 현재 선언하고 있는 task를 수행하기 전에 먼저 실행되어야하는 task들의 배열 목록을 작성할 수 있습니다. 위의 예제에서는 JavaScript 파일을 병합하는 task를 진행하기 전에 JavaScript Lint(자바스크립트 문법 검사)를 먼저 수행하도록 정의되어 있습니다. (물론 그 전에 lint-js task를 이 task보다 앞에 작성해주어야 먼저 수행할 수 있을 것입니다.)
// func - 실제 수행할 업무 프로세스를 정의하는 function 입니다.(처리해야할 일을 정의)
var path = {
    src : {
        root : 'src/'
    },
    dest : {
        root : 'docs/'
    }
}

var config = {
    pathRoot : path.src,
    port : 3001
}

var scssOptions = {
    /** * outputStyle (Type : String , Default : nested) * CSS의 컴파일 결과 코드스타일 지정 * Values : nested, expanded, compact, compressed */
    outputStyle : 'expanded',
    /** * indentType (>= v3.0.0 , Type : String , Default : space) * 컴파일 된 CSS의 "들여쓰기" 의 타입 * Values : space , tab */
    indentType : "tab",
    /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2) * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */
    indentWidth : 1,
    /** * precision (Type : Integer , Default : 5) * 컴파일 된 CSS 의 소수점 자리수. */
    precision: 6,
    /** * sourceComments (Type : Boolean , Default : false) * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */
    sourceComments: true
}

function copyHTML(done){

    // index.html 복사
    gulp.src([path.src.root + '*.html'])
    .pipe(gulp.dest(path.dest.root))
    .pipe(browserSync.stream());

    // landkid html 복사
    gulp.src([path.src.root + '**/*.html'])
    .pipe(gulp.dest(path.dest.root))
    .pipe(browserSync.stream());

    done();
};

function buildJS(done){

    gulp.src([path.src.root + '**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    done();

}

function buildCSS(done){

    gulp.src([path.src.root + 'scss/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(scss(scssOptions).on('error', scss.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.root + 'css/'))
        .pipe(browserSync.stream());

    done();
}

// copy images
function copyResource(done){

    gulp.src([path.src.root + '**/*.png'])
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    gulp.src([path.src.root + '**/*.jpg'])
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    gulp.src([path.src.root + '**/*.gif'])
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    gulp.src([path.src.root + '**/*.svg'])
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    gulp.src([path.src.root + '**/*.mp3'])
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    gulp.src([path.src.root + '**/*.mp4'])
        .pipe(gulp.dest(path.dest.root))
        .pipe(browserSync.stream());

    done();
};

// watch
function watch(done){
    gulp.watch(path.src.root + '**/*.scss', buildCSS).on('change', browserSync.reload);
    gulp.watch(path.src.root + '**/*.js', buildJS).on('change', browserSync.reload);
    gulp.watch(path.src.root + '**/*.html', copyHTML).on('change', browserSync.reload);
    gulp.watch(path.src.root + 'img/**/*', copyResource).on('change', browserSync.reload);
    gulp.watch(path.src.root + '*.html', copyHTML).on('change', browserSync.reload);

    done();
}

// 서버 task
function server(done) {
    browserSync.init({
        /*server: {
            baseDir: path.dest.root
        },*/
        proxy: "http://localhost:5000",
        port: config.port,
        index: "/index.html",
        browser: "chrome",
        open: false

    });

    done();
}

function runNodemon (done) {

    var started = false;

    return nodemon({
        script: './src/app.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            done();
            started = true;
        }
    });
}

exports.default = gulp.series(copyHTML, buildJS, buildCSS, copyResource, server, runNodemon, gulp.parallel(watch));
