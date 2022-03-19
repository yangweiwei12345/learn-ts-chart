const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // 分离css独立文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');   // 压缩css
/**
 * 所有构建工具都是基于nodejs运行的  模块化默认此啊用commonjs
 */

// 设置开发环境
process.env.NODE_ENV = "development";//"production";

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'js/bundle.js',
    // 输出路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      /**
       * js兼容性处理：babel-loader @babel/core @babel/preset-env
       * 1.基本js兼容性代码 @babel/preset-env
       * 问题： 只能转换基本语法，如promise高级语法不能转换
       * 2. 全部js兼容性处理 @babel/polyfill 去js中倒入@babel/polyfill
       * 问题：将所有兼容性代码全部引入，体积太大
       * 3. 按需加载兼容： core-js
       */
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设：指示babel怎么样兼用性处理
            presets: [
              [
                '@babel/preset-env',
                {
                  // 按需加载
                  useBuiltIns: 'usage',
                  // 指定core-js版本
                  corejs: {
                    version: 3
                  },
                  // 指定兼容到那个浏览器版本
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]
            ]
          }
        }
        
      },

      // 语法检查： eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
      // 只我们的检查js源码
      // airbnb: eslint eslint-config-airbnb-base eslint-plugin-import
      /**
       * package.json
       * "eslintConfig": {
            "extends": "airbnb-base"
          }
       */
      {
        test: '/\.js/',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint错误
          fix: true
        }
      },
      {
        // 匹配那些文件
        test: /\.css$/,
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          // 'style-loader',
          // 这个loader取代style-loader。作用：提取js中css成单独的文件
          MiniCssExtractPlugin.loader,
          // 将css编程commonjs模块加载js中，里面内容都是样式字符串
          'css-loader',
          /**
           * css兼容性： postcss --> postcss-loader postcss-preset-env
           * postcss-preset-env帮助postcss涨到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
           * "browserslist": {
           *    // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = "development"
                "development": [  
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ],
                // 生产环境，默认是生产环境
                "production": [
                  ">0.2%",
                  "not dead",
                  "not op_mini all"
                ]
              }
           */ 
          // 使用loader默认配置
          // 'postcss-loader',
          // 修改loader配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env'
                  ]
                ]
              }
            }
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          // 'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader', // url-loader file-loader
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          output: 'imgs',
        }
      }, {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10]:[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html
      minify: {
        collapseWhitespace: true,   // 移除空格
        removeComments: true,       // 移除注释
      }
    }),
    new MiniCssExtractPlugin({
      // css文件重命名
      filename: 'css/main.css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // mode和开发环境还是生产环境没有关系
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
};