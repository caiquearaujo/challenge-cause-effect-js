import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

module.exports = [
	{
		input: 'src/main.ts',
		output: {
			file: 'public/dist/cause-effect.js',
			name: 'causeEffect',
			format: 'umd',
		},
		plugins: [
			resolve(),
			typescript(),
			scss({
				output: 'public/dist/styles.css',
				processor: () => postcss([autoprefixer()]),
				outputStyle: 'compressed',
			}),
		],
	},
];
