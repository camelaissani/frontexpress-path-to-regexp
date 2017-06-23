import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    entry: 'index.js',
    format: 'iife',
    sourceMap: true,
    moduleName:'pathToRegexp',
    dest: 'frontexpress-path-to-regexp.min.js',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            namedExports: {
                'node_modules/path-to-regexp/index.js': ['pathToRegexp']
            }
        }),
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        }),
        uglify({}, minify)
    ]
};
