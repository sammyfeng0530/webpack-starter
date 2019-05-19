const path=require('path'); //node.js的语法，引入路径模块，为了输出的时候找绝对路径
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const  MiniCssExtractPlugin  =  require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js', //入口文件为index.js,将其放在入口文件夹src中
    ],
    output: {
        path: path.resolve(__dirname, './dist/'), // path.resolve为node.js的固定语法，用于找到当前文件的绝对路径
        filename: 'js/index.bundle.js'// 输出的文件为index.bundle.js，将其放在出口文件夹dist的js文件夹中
    },
    devServer:{
        contentBase: "./dist/html",// 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        port:8083,    //端口
        hot:true,    //开启热更新
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),    //引入热更新插件
        new HtmlWebpackPlugin({
            title:'Title',    // 这个值对应html里的title
            template: __dirname + "/src/html/template.html",//模板文件地址
            filename:'./html/index.html',    //文件名，默认为index.html（路径相对于index.js的值，现将其放到dist/html中）
            inject:true,    //script标签的位置，true/body为在</body>标签前，head为在<head>里，false表示页面不引入js文件
            hash:true,    //是否为引入的js文件添加hash值
        }),
        new  MiniCssExtractPlugin({
            filename:  "./css/style.css", //路径相对于output.path，将其安装到dist/css文件夹中
            chunkFilename:  "./css/[id].css"
        }),
        new webpack.ProvidePlugin({    //它是一个插件，所以需要按插件的用法new一个
            $:'jquery',    //接收名字:模块名
            jQuery: 'jquery'
        }),
    ],
    module:  {
        rules:  [
            {
                test: /\.(html)$/,
                loader: 'html-loader',
                exclude: /node_modules/,
                options: {
                    attrs: ['img:src', 'link:href'],
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /(\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            "@babel/preset-env"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 30KB 以下的文件采用 url-loader
                        limit: 1024 * 30,
                        // 否则采用 file-loader，默认值就是 file-loader
                        fallback: 'file-loader',
                        name: '[name].[ext]',
                        outputPath: './images/',
                        publicPath:'../images/'
                    }
                }]
            },
        ]
    },
};