module.exports = {
    mode: "production",
    entry: './src/NativeUi.ts',
    target: 'node',
    output: {
        filename: 'NativeUi.js',
        library: 'nativeui',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts"]
    },
    performance: {
        hints: false
    },
};
