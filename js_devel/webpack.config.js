module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {filename: '../app/assets/javascripts/gameapp/[name].bundle.js'},
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png)$/,
                loaders: 'url-loader'
            },
        ],
        loaders: [
        ]
    },
    node: {
        fs: "empty"
    }
}
