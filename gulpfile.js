const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
	gulp.src('lib/*.js')
		.pipe(babel({
			presets: ['stage-2'],
			plugins: ['transform-runtime']
		}))
		.pipe(gulp.dest('dist'))
);
