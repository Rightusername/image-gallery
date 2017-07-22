const HtmlWebpackPlugin = require('html-webpack-plugin');



const config = {
    entry: './src/main.js',

    output: {
        path: 'C:\\Users\\Star-pc\\react-projects\\ImageGallery\\public',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 3000
    },


    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
 
};

module.exports = config;