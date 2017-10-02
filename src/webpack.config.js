var webpack = require('webpack')
var path = require('path')
var PATH = path.join(__dirname)
var ENTRY_PATH = path.join(PATH, '/javascripts/app/index.js')
var PUBLIC_PATH = path.join(PATH, '../public/javascripts')


module.exports = {
    entry: ENTRY_PATH,
    output:{
        path:PUBLIC_PATH,
        filename:'index.js'
    },
    module:{
        rules:[
            {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
        ]
    },
    resolve:{
        alias:{
            modules:path.join(PATH, 'modules'),
            scss:path.join(PATH, 'scss')
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}