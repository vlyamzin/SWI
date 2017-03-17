let gulp = require('gulp');
let ts = require('gulp-typescript');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let tsify = require('tsify');
let runsequence = require('run-sequence');

let paths = {
    pages: ['src/*.html'],
    clientDest: 'bin/www',
    server: ['server/**/*.ts'],
    serverDest: 'bin'
};

gulp.task('client', ['copy-html'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['client/gui/board.ts', 'client/gui/index.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.clientDest));
});

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.clientDest));
});

let serverBuildIterator = 0;

/**
 * Build typescript server files and put them into paths.serverDest
 * */
gulp.task('server-ts', function () {
    let tsServer,
        serverProject = ts.createProject('tsconfig.json', {
            target: 'es6',
            isolatedModules: Boolean(serverBuildIterator % 5),
            sourceMap: false
        }),
        failed = false;

    serverBuildIterator++;

    tsServer = gulp.src(paths.server)
        .pipe(serverProject());

    return tsServer
        .on("error", function () { failed = true; })
        .on("finish", function () {
            if (failed && process.argv.indexOf('--no-emit') != -1) {
                process.exit(1);
            }
        })
        .pipe(gulp.dest(paths.serverDest));
});

/**
 * Copy www.js file for server start into paths.serverDest
 * */
gulp.task('copy-www', function () {
    gulp
        .src('server/www.js')
        .pipe(gulp.dest(paths.serverDest));
});

/**
 * Build server side
 * */
gulp.task('build-server', () => {
    return runsequence('copy-www', 'server-ts');
});

/**
 * Watch server *.ts files (build server side before watching)
 * */
gulp.task('server-watch', () => {
    runsequence('build-server');

    gulp.watch([paths.server], () => {
        runsequence('server-ts');
    })
});