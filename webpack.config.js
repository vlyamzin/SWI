var path = require("path");

module.exports = {
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
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
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
            }
        ]
    },
    devtool: 'inline-source-map'
};