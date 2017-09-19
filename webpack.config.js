module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {filename: 'dist/js/[name].bundle.js'},
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png)$/,
                loaders: 'url-loader'
            },
        ]
    },
    node: {
        fs: "empty"
    }
}
