const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');

const config = {
    entry: {
        main: path.join(__dirname, 'client/index.tsx'),
        login: path.join(__dirname, 'client/login.tsx')
    },
    output: {
        path: path.join(__dirname, 'bin/www'),
        filename: '[name]-bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        alias: rxPaths()
    },
    performance: {
        hints: false
    },
    plugins: [
        new CopyPlugin([{ from: path.join(__dirname, 'client/assets/img'), to: 'assets/img' }]),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: [/node_modules/]
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|jpe?g)$/,
                use: [
                    {
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img/'
                        },
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     },
    // },
    devtool: 'inline-source-map'
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
