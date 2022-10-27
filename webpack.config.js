import path from "path";

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import pkg from "webpack";
const { ProvidePlugin, DefinePlugin } = pkg;

export default {
    entry: path.join(path.resolve(__dirname, "lib"), "index.js"),
    output: {
        library: "JSEncrypt",
        libraryTarget: "umd",
        libraryExport: "default",
        globalObject: "window",
        path: path.resolve(__dirname, "bin"),
        filename: "jsencrypt.js",
    },
    mode: "development",
    performance: { hints: false },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    plugins: [
        new ProvidePlugin({
            process: "process/browser",
        }),
        new DefinePlugin({
            "process.env.npm_package_version": `${require("./package.json").version}`,
        }),
    ],
};
