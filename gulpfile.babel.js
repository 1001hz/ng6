'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var inject = require('gulp-inject');

let root = 'client';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist'),
  sass: ['./client/app/app.scss'],
  sg: {
    directory: 'styleguide/',
    appDirectory: 'styleguide/app/',
    sassGenerated: ['styleguide/style.scss'],
    sass: [
      './client/app/*.scss',
      './client/app/**/*.scss',
    ],
    sassComponents: [
      './client/app/*.scss',
      './client/app/**/*.scss'
    ]
  }
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry);

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  })
});

gulp.task('default', ['watch']);

/**
 * Styleguide specific
 */

gulp.task('sass-inject', function() {
  var files = gulp.src(paths.sg.sassComponents, {read: false});

  return gulp.src(paths.sg.sassGenerated)
      .pipe(inject(files, {
        starttag: '// injector',
        endtag: '// endinjector',
        transform: function(filepath) {
          filepath = filepath.split('/');
          var path = '@import \'..';
          filepath.map(function(part){
            path += part+'/';
          });
          path = path.substring(0, path.length - 1);
          return path + '\';';
        }
      }))
      .pipe(gulp.dest(paths.sg.directory));
});

gulp.task('styleguide:generate', function() {
  return gulp.src(paths.sg.sass)
      .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        rootPath: paths.sg.appDirectory,
        overviewPath: 'README.md'
      }))
      .pipe(gulp.dest(paths.sg.appDirectory));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(paths.sg.sassGenerated)
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest(paths.sg.appDirectory));
});

gulp.task('watch', ['styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['sass-inject', 'styleguide:generate', 'styleguide:applystyles']);