import uglify from '@lopatnov/rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

module.exports = [
	{
		input: 'src/main.ts',
		output: {
			file: 'dist/cause-effect.js',
			name: 'cause-effect',
			format: 'umd',
		},
		plugins: [
			resolve(),
			typescript(),
			scss({
				output: '/styles.css',
				processor: () => postcss([autoprefixer()]),
				outputStyle: 'compressed',
			}),
		],
	},
	{
		input: 'src/main.ts',
		output: {
			file: 'dist/cause-effect.min.js',
			name: 'cause-effect',
			format: 'umd',
		},
		plugins: [resolve(), typescript(), uglify()],
	},
];
