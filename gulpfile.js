/* eslint no-console: "off" */
/* eslint @typescript-eslint/explicit-function-return-type: "off" */
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack');
const cssnano = require('cssnano');
const changed = require('gulp-changed');
const postcss = require('gulp-postcss');
const stylelint = require('gulp-stylelint');
const autoprefixer = require('autoprefixer');

const webpackConfig = require('./webpack.config.js');
const cssnanoConfig = { discardComments: { removeAll: true } };
const stylelintConfig = { reporters: [{ formatter: 'string', console: true }] };

const pathSrc = './src';
const pathDist = './dist';
const pathBuild = './build';
const pathElectron = './electron';

const paths = {
    styles: {
        src: `${pathSrc}/styles/app.scss`,
        files: `${pathSrc}/styles/**/*.scss`,
        dist: `${pathDist}/styles`
    },
    scripts: {
        src: `${pathSrc}/scripts/index.tsx`,
        files: `${pathSrc}/scripts/**/*.(ts|tsx)`,
        dist: `${pathDist}/scripts`
    },
    fonts: {
        src: `${pathSrc}/fonts`,
        files: `${pathSrc}/fonts/**/*`,
        dist: `${pathDist}/fonts`
    },
    images: {
        src: `${pathSrc}/images`,
        files: `${pathSrc}/images/**/*`,
        dist: `${pathDist}/images`
    },
    sounds: {
        src: `${pathSrc}/sounds`,
        files: `${pathSrc}/sounds/**/*`,
        dist: `${pathDist}/sounds`
    },
    electron: {
        src: pathElectron,
        files: `${pathElectron}/**/*`,
        dist: pathDist
    }
};

let env = 'prod';

// clear build folders
const taskClearDist = () => del(pathDist);
const taskClearBuild = () => del(pathBuild);

// lint SASS files
const taskStylelint = () => {
    return gulp.src(paths.styles.files)
        .pipe(changed(paths.styles.dist))
        .pipe(stylelint(stylelintConfig));
};

// build CSS
const taskStyles = () => {
    return gulp.src(paths.styles.src)
        .pipe(changed(paths.styles.dist))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            cssnano(cssnanoConfig)
        ]))
        .pipe(gulp.dest(paths.styles.dist));
};

// copy font files
const taskFonts = () => {
    return gulp.src(paths.fonts.files)
        .pipe(changed(paths.fonts.dist))
        .pipe(gulp.dest(paths.fonts.dist));
};

// copy images
const taskImages = () => {
    return gulp.src(paths.images.files)
        .pipe(changed(paths.images.dist))
        .pipe(gulp.dest(paths.images.dist));
};

// copy sound files
const taskSounds = () => {
    return gulp.src(paths.sounds.files)
        .pipe(changed(paths.sounds.dist))
        .pipe(gulp.dest(paths.sounds.dist));
};

// copy Electron-specific files
const taskElectron = () => {
    return gulp.src(paths.electron.files)
        .pipe(changed(paths.electron.dist))
        .pipe(gulp.dest(paths.electron.dist));
};

// build JS
const taskScripts = cb => {
    const conf = webpackConfig(env);
    let isFirstRun = true;

    webpack(conf, (err, stats) => {
        if (err) {
            console.error(err.stack || err);

            if (err.details) {
                console.error(err.details);
            }
            if (isFirstRun) {
                cb();
            }
            return;
        }
        console.log(
            stats.toString({
                children: false,
                modules: false,
                colors: true,
                hash: false
            })
        );
        console.log('-----------------------------------');
        console.log('✓  Build finished\n');

        if (isFirstRun) {
            isFirstRun = false;
            cb();
        }
    });
};

// watch files and perform given tasks
const taskWatch = cb => {
    env = 'dev';
    gulp.watch(paths.styles.files, gulp.series(taskStylelint, taskStyles));
    gulp.watch(paths.fonts.files, taskFonts);
    gulp.watch(paths.images.files, taskImages);
    gulp.watch(paths.sounds.files, taskSounds);
    gulp.watch(paths.electron.files, taskElectron);
    cb();
};

// build app
const build = gulp.series(
    taskClearDist,
    taskElectron,
    taskFonts, taskImages, taskSounds,
    taskStylelint, taskStyles,
    taskScripts
);

module.exports = {
    clean: gulp.parallel(taskClearBuild, taskClearDist),
    build: gulp.series(taskClearBuild, build),
    dev: gulp.series(taskWatch, build)
};
