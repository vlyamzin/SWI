var gulp = require('gulp');
var ts = require('gulp-typescript');
var runsequence = require('run-sequence');

var paths = {
    pages: ['src/*.html'],
    clientDest: 'bin/www',
    server: ['server/**/*.ts'],
    serverDest: 'bin'
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.clientDest));
});

var serverBuildIterator = 0;

/**
 * Build typescript server files and put them into paths.serverDest
 * */
gulp.task('server-ts', function () {
    var tsServer,
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