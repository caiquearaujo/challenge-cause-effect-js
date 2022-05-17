import uglify from '@lopatnov/rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

module.exports = [
	{
		input: 'src/main.ts',
		output: {
			file: 'dist/cause-effect.js',
			name: 'cause-effect',
			format: 'umd',
		},
		plugins: [resolve(), typescript()],
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
