const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');

function enableAnalyzer(flag, cb) {
    let res;

    res = flag ? new BundleAnalyzerPlugin () : null;

    if (cb && typeof cb === "function") {
        cb(res);
    } else {
        return res;
    }
}

function getEnvironment(env) {
    if (!env) {
        return 'none';
    }

    if (env.production) {
        return 'production';
    }

    return env;
}

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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'client/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'client/login.html',
            chunks: ['login']
        })
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
    devtool: 'source-map'
};

module.exports = env => {
    config.mode = getEnvironment(env);

    enableAnalyzer(config.mode === 'development', (plugin) => {
        if (plugin) {
            config.plugins.push(plugin);
        }
    });

    return config;
};
