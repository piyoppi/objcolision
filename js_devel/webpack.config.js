module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {filename: 'dist/js/[name].bundle.js'},
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
        ]
    },
    node: {
        fs: "empty"
    }
}
