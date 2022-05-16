import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

module.exports = [
	{
		input: 'src/ts/index.ts',
		output: {
			file: 'dev/dist/cause-effect.js',
			name: 'cause-effect',
			format: 'umd',
		},
		plugins: [
			resolve(),
			typescript(),
			scss({
				output: 'dev/dist/styles.css',
				processor: () => postcss([autoprefixer()]),
				outputStyle: 'compressed',
			}),
		],
	},
];
