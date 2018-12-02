const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const distPath = path.join(__dirname, 'dist');
const cachePath = path.join(__dirname, '.cache');
const srcPath = path.join(__dirname, 'src');
const stylePath = path.join(__dirname, 'src/styles');
const API_HOST = process.env.API || '//10.10.10.200';
const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 8686;

const filesNameMapper = {
    filename: isDev ? '[name].js' : 'assets/js/[name].[chunkhash:5].js',
    chunkFilename: isDev ? '[name].chunk.js' : 'assets/js/[name].[chunkhash:5].chunk.js',
    cssFilename: isDev ? '[name].css' : 'assets/css/[name].[chunkhash:5].css',
    cssChunkFilename: isDev ? '[id].css' : 'assets/css/[name].[chunkhash:5].css',
    imgFilename: 'assets/images/[name].[hash:5].[ext]'
};
const plugins = [
    new webpack.DefinePlugin({
        __DEV__: isDev,
        APP_NAME: '"后台管理系统"'
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/favicon.ico',
        filename: 'index.html',
        title: 'React Scaffold',
        inject: 'body',
        minify: {
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        moment: 'moment',
        classNames: 'classnames',
        asyncComponent: ['AsyncComponent', 'default']
    }),
    new MiniCssExtractPlugin({
        filename: filesNameMapper.cssFilename,
        chunkFilename: filesNameMapper.cssChunkFilename
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
];
const productionPlugins = [
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new CleanWebpackPlugin([distPath]),
    new webpack.NoEmitOnErrorsPlugin()
];
const entry = {
    vendors: ['./src/vendors.js'],
    app: ['./src/index.jsx']
};
module.exports = function config() {
    if (isDev) {
        plugins.push(
            ...[
                new webpack.NamedModulesPlugin(),
                new StyleLintPlugin({
                    configFile: path.join(__dirname, '.stylelintrc'),
                    files: ['**/*.less', '**/*.css']
                })
            ]
        );
        entry.app.unshift('react-hot-loader/patch');
    } else {
        plugins.push(...productionPlugins);
    }
    return {
        mode: isDev ? 'development' : 'production',
        entry,
        output: {
            path: distPath,
            filename: filesNameMapper.filename,
            chunkFilename: filesNameMapper.chunkFilename,
            publicPath: '/'
        },
        devServer: {
            proxy: {
                '/api': {
                    target: `http:${API_HOST}:8490`,
                    pathRewrite: { '^/api': '' }
                }
            },
            contentBase: distPath,
            publicPath: '/',
            historyApiFallback: true,
            host: '0.0.0.0',
            port,
            inline: true,
            disableHostCheck: true,
            https: false,
            stats: 'errors-only',
            clientLogLevel: 'error'
        },
        resolve: {
            symlinks: false,
            extensions: ['.js', '.jsx', '.less'],
            modules: ['node_modules', srcPath],
            alias: {
                react: isDev ? 'react' : nodeModulesPath('/react/umd/react.production.min.js'),
                redux: nodeModulesPath('/redux/dist/redux.min.js'),
                'react-redux': nodeModulesPath('/react-redux/dist/react-redux.min.js'),
                '@': path.join(__dirname, 'src'),
                i18n: path.join(__dirname, 'src/i18n'),
                components: path.join(__dirname, 'src/components'),
                containers: path.join(__dirname, 'src/containers'),
                layouts: path.join(__dirname, 'src/layouts'),
                reducers: path.join(__dirname, 'src/reducers'),
                pages: path.join(__dirname, 'src/pages'),
                services: path.join(__dirname, 'src/services'),
                utils: path.join(__dirname, 'src/utils'),
                styles: path.join(__dirname, 'src/styles'),
                sagas: path.join(__dirname, 'src/sagas'),
                store: path.join(__dirname, 'src/store'),
                public: path.join(__dirname, 'public'),
                AsyncComponent: path.join(__dirname, 'src/components/AsyncComponent.jsx')
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['eslint-loader', 'source-map-loader'],
                    enforce: 'pre',
                    exclude: /(node_modules|src\/libs|libs)/
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|src\/libs|libs)/,
                    include: srcPath,
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: path.join(cachePath, 'jscache')
                            }
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                extends: path.join(__dirname, '.babelrc')
                            }
                        }
                    ]
                },
                {
                    test: /\.(le|c)ss$/,
                    include: /(node_modules)/,
                    exclude: srcPath,
                    use: styleLoaderConfig()
                },
                {
                    test: /\.(le|c)ss$/,
                    include: stylePath,
                    use: styleLoaderConfig({ useCssModule: false }),
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(le|c)ss$/,
                    include: /(src\/pages|src\/components|src\/containers|src\/layouts)/,
                    use: styleLoaderConfig({ useCssModule: true }),
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 8124,
                                name: filesNameMapper.imgFilename
                            }
                        }
                    ]
                }
            ]
        },
        resolveLoader: {
            moduleExtensions: ['-loader']
        },
        externals: {
            moment: false
        },
        plugins,
        optimization: {
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            minimizer: [
                new UglifyJSPlugin({
                    cache: path.join(cachePath, 'uglifycache'),
                    sourceMap: true,
                    parallel: true,
                    uglifyOptions: {
                        ecma: 5,
                        output: {
                            comments: /webpackChunkName/,
                            beautify: false
                        },
                        compress: {
                            drop_console: true,
                            warnings: false,
                            conditionals: true,
                            unused: true,
                            comparisons: true,
                            sequences: true,
                            dead_code: true,
                            evaluate: true,
                            if_return: true,
                            join_vars: true
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin()
            ],
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: module => {
                            return /classnames|babel-runtime|core-js|react|redux|moment|prop-types/.test(
                                module.context
                            );
                        },
                        chunks: 'initial',
                        minChunks: 1,
                        priority: -10
                    }
                }
            }
        },
        performance: {
            hints: false
        },
        cache: true,
        watch: false,
        devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map'
    };
};

function styleLoaderConfig(options = {}) {
    const useCssModule = options.useCssModule || false;
    return [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'cache-loader',
            options: {
                cacheDirectory: path.join(cachePath, 'csscache')
            }
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                modules: useCssModule,
                localIdentName: '[local]--[hash:base64:4]'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: path.join(__dirname, 'postcss.config.js'),
                    ctx: {
                        autoprefixer: {
                            browsers: ['Safari >= 10', 'last 1 firefox version', 'Chrome >= 66', 'Explorer >= 10']
                        },
                        cssnano: { preset: 'default' },
                        cssVariables: {}
                    }
                }
            }
        },
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true,
                modifyVars: {}
            }
        }
    ];
}

function nodeModulesPath(filePath) {
    return path.join(__dirname, 'node_modules', filePath);
}
