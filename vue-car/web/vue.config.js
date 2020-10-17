// const path = require('path')

// module.exports = {  
//   // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
//   publicPath: './',  
//   // 输出文件目录
//   outputDir: 'dist',  
//   // eslint-loader 是否在保存的时候检查
//   lintOnSave: false,  
//   // 是否使用包含运行时编译器的 Vue 构建版本
//   runtimeCompiler: false,  
//   // 生产环境是否生成 sourceMap 文件
//   productionSourceMap: false,  
//   // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
//   integrity: false,  
//   // webpack相关配置
//   chainWebpack: (config) => {
//     config.resolve.alias
//       .set('vue$', 'vue/dist/vue.esm.js')
//       .set('@', path.resolve(__dirname, './src'));
//       // const svgRule = config.module.rule('svg')
//       // svgRule.uses.clear()
//       // svgRule
//       //     .use('svg-sprite-loader')
//       //     .loader('svg-sprite-loader')
//       //     .options({
//       //         symbolId: 'icon-[name]',
//       //         include:["./src/icons"]
//       //       });

//   },
//   configureWebpack: (config) => {    
//   if (process.env.NODE_ENV === 'production') {      
//       // 生产环境
//       config.mode = 'production'
//     } else {      
//       // 开发环境
//       config.mode = 'development'
//     }
//   },  
//   // css相关配置
//   css: {    
//     // 是否分离css（插件ExtractTextPlugin）
//     extract: true,    
//     // 是否开启 CSS source maps
//     sourceMap: false,   
//     // css预设器配置项
//     loaderOptions: {
//         sass: { 
//         prependData: `@import "./src/styles/main.scss";`
//       }
//     },    
//     // 是否启用 CSS modules for all css / pre-processor files.
//     modules: false
//   },  
//   // 是否使用 thread-loader
//   parallel: require('os').cpus().length > 1, 
//   // PWA 插件相关配置
//   pwa: {}, 
//   // webpack-dev-server 相关配置
//   devServer: {
//     open: true,
//     host: 'localhost',
//     port: 8080,
//     https: false,
//     hotOnly: false,   
//     // http 代理配置
//   //   proxy: {
//   //     '/devApi': {
//   //         target: 'http://www.web-jshtml.cn/productapi/token', //API服务器的地址
//   //         changeOrigin: true,
//   //         pathRewrite: {
//   //             '^/devApi': '' //如果没有带文件夹就需要更改为/productap，如果有文件夹就设置为空串
//   //         }
//   //     }
//   // },

//   //vue 3.0
//   proxy: {
//           //后端接口 "http://www.web-jshtml.cn/api/cars"
//           [process.env.VUE_APP_API_LOGIN]: {
//               target: process.env.VUE_API_DEV_LOGIN_TARGET, //API服务器的地址
//               changeOrigin: true,
//               pathRewrite: {
//                   [`^${process.env.VUE_APP_API_LOGIN}`]: ''
//               }
//           },
//           //web端接口 "http://www.web-jshtml.cn/api/cars/web"
//           [process.env.VUE_APP_API_WEB]: {
//             target: process.env.VUE_API_DEV_WEB_TARGET, //API服务器的地址
//             changeOrigin: true,
//             pathRewrite: {
//                 [`^${process.env.VUE_APP_API_WEB}`]: ''
//             }
//         }
//   },
//     before: (app) => {}
//   }, 
//   // 第三方插件配置
//   pluginOptions: {

//   }
// }

//vue 3.0
const path = require('path');
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: (config) => {


    const svgRule = config.module.rule("svg");     
    svgRule.uses.clear();     
    svgRule
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({ 
      symbolId: "icon-[name]",
      include: ["./src/icons"] 
    });
  },
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components')
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: { 
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      //后端接口 "http://www.web-jshtml.cn/api/cars"
      [process.env.VUE_APP_API_LOGIN]: {
          target: process.env.VUE_API_DEV_LOGIN_TARGET, //API服务器的地址
          changeOrigin: true,
          pathRewrite: {
              [`^${process.env.VUE_APP_API_LOGIN}`]: ''
          }
      },
      //web端接口 "http://www.web-jshtml.cn/api/cars/web"
      [process.env.VUE_APP_API_WEB]: {
        target: process.env.VUE_API_DEV_WEB_TARGET, //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.VUE_APP_API_WEB}`]: ''
        }
    }

      // http://www.web-jshtml.cn/api/vue3  /api/getCode
    }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}
