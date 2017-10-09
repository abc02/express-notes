const path = require('path')
const fs = require('fs');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const EjsWebpacksPlugin = require('ejs-webpack-plugin');

const PATH = path.join(__dirname)
const env = process.env.NODE_ENV || 'development';

module.exports = {

    devtool: "source-map", // enum
    // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    // 牺牲了构建速度的 `source-map' 是最详细的。

    target: "web", // 枚举
    // 包(bundle)应该运行的环境
    // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)
    entry: {
        'index': [path.join(PATH, '../src/javascripts/app/index.js')],
    },
    output: {
        path: path.join(__dirname, '../public'),
        filename: '[name]_[chunkhash:5].js',
        // chunkFilename: "./[name]/[id].chunk.js",
        publicPath: '/'
    },


    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new ExtractTextPlugin('stylesheets/[name]-style_[chunkhash:5].css'),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: Infinity,
            name: 'vendor',
            filename: 'javascripts/vendor_[chunkhash:5].js',
            minChunks: 2
        }),
        // new HtmlWebpackPlugin({
        //     hash: true,
        //     template: 'ejs-render!./dev/index.ejs',
        //     inject: 'body'
        // }),
        // new HtmlWebpackPlugin({
        //     template: '!!handlebars!' + path.join(__dirname, '../views/entry/test.ejs'),
        //     title:'ejs',
        //     inject:true
        //   }),
          new HtmlWebpackPlugin({
            template: '!!raw-loader!' + path.join(__dirname, '../views/entry/index.ejs'),
            filename: '../views/index.ejs'  // this line decide the extension of output file.
          })
        // new EjsWebpacksPlugin({
        //     context: __dirname,
        //     entry: {
        //         '../views/entry/test.ejs': {
        //             'js': ['index', 'vendor'],
        //             'css': ['index-style'],
        //             'output': './views' //默认同Key
        //         },
        //     }
        // })
    ],


    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                use: {
                    loader: 'babel-loader',
                },
                // include: path.join(__dirname, '../public'),
                exclude: /node_modules/
            },
            // {
            //     test: /\.(tpl|ejs)$/,
            //     loader: 'ejs',
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[sha512:hash:base64:7].[ext]'
                    }
                }
            },
        ]
    },
    resolve: {
        alias: {
            api: path.join(PATH, '../src/javascripts/api'),
            app: path.join(PATH, '../src/javascripts/app'),
            modules: path.join(PATH, '../src/javascripts/modules'),
            scss: path.join(PATH, '../src/stylesheets')
        }
    }

}