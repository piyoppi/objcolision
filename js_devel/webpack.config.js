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
            }
        ],
        loaders: [
        ]
    },
    node: {
        fs: "empty"
    }
}
