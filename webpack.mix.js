const mix = require('laravel-mix');
const path = require('path');

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['.js', '.ts', '.vue']
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'bundles/[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'public')
    },
});

mix.js('resources/js/admin/app.ts', 'public/js/admin').version();
mix.js('resources/js/auth/login.js', 'public/js/auth').version();
mix.js('resources/js/client/loader.ts', 'public/js/client').version();

mix.sass('resources/sass/app.scss', 'public/css').version();
