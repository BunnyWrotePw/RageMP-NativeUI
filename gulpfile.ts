import * as gulp from 'gulp';
import * as webpack from 'webpack-stream';
import * as buildConfig from "./webpack.config.js"

gulp.task("build", function() {
    return gulp
        .src(buildConfig.entry)
        .pipe(webpack(buildConfig))
        .pipe(gulp.dest("dist"));
});