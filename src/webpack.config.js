var webpack = require('webpack')
var path = require('path')
var PATH = path.join(__dirname)
var ENTRY_PATH = path.join(PATH, '/javascripts/main.js')
var PUBLIC_PATH = path.join(PATH, '../public/javascripts')


module.exports = {
    entry: ENTRY_PATH,
    output: {
        path: PUBLIC_PATH,
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                /*
                creates style nodes from JS strings
                translates CSS into CommonJS
                 compiles Sass to CSS
                */
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                /*
                creates style nodes from JS strings
                translates CSS into CommonJS
                 compiles Sass to CSS
                */
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            app: path.join(PATH, 'javascripts/app'),
            modules: path.join(PATH, 'javascripts/modules'),
            scss: path.join(PATH, 'scss')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}