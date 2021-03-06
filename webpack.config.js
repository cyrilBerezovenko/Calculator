module.exports = {
    context: "G:\\IntelliJ IDEA\\Projects\\Calculator",
    devtool: "source-map",
    mode: "development",
    entry: ".\\src\\main\\webapp\\js\\index.js",
    output: {
        path: "G:\\IntelliJ IDEA\\Projects\\Calculator\\src\\main\\webapp\\dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};