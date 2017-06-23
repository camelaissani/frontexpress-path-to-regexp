import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'index.js',
    format: 'iife',
    moduleName:'pathToRegexp',
    dest: 'frontexpress-path-to-regexp.js',
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
        })
    ]
};
