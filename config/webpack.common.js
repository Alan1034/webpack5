const path = require("path");
const webpack = require("webpack");
const fs = require('fs')
const defaultSettings = require('../src/settings.js')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack');

const name = defaultSettings.title || 'Base管理系统' // 标题
const CURRENT_ENV = process.env.CURRENT_ENV || 'prod'

//自动生成env文件路径，用.env.XXX中的XXX去匹配文件
const envConfigPath = {};
const fileDirectory = path.resolve(__dirname, '../')
if (fs.existsSync(fileDirectory)) {
    const files = fs.readdirSync(fileDirectory)
    const env = []
    files.forEach((item) => {
        if ((/\.env/.test(item))) {
            env.push(item)
        }
    })
    env.forEach((item) => {
        const envName = item.split(".")
        envConfigPath[envName[2]] = path.resolve(__dirname, `../${item}`)
    })
}
else {
    console.log(fileDirectory + "  Not Found!");
}

//写在.env文件内的变量并没有被打包前的webpack读取到，在webpack内使用需要手动加入环境变量
const envConfig = dotenv.parse(fs.readFileSync(envConfigPath[CURRENT_ENV]))
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

module.exports = {
    name,
    entry: "./src/main.js",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            ),
            use: [
                // "thread-loader", // 多线程编译，可能会导致报错
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ],
        },

        {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        },
        {
            test: /\.less$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader']
        },
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts/',
                    esModule: false
                }
            }
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/',
                    esModule: false
                }
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                use: [
                    // "thread-loader", // 多线程编译，可能会导致报错
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ],
            }
        },
        ]
    },
    resolve: {
        extensions: ['\*', '.js', '.jsx', '.vue'], // 能够使用户在引入模块时不带扩展
        alias: {
            "@": path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm-bundler.js'
        },
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "bundle.js"
    },

    plugins: [
        new Dotenv({
            path: envConfigPath[CURRENT_ENV],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: `${name}`,
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
            template: path.resolve(__dirname, "../public/index.html")
        }),
        // 打包时生成一个index.html
        // 配置：https://github.com/jantimon/html-webpack-plugin#options
        new webpack.DefinePlugin({
            '__VUE_OPTIONS_API__': true,
            '__VUE_PROD_DEVTOOLS__': false,
        })
    ],
    //why:https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
};