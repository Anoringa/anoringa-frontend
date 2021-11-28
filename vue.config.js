var webpack = require("webpack");
const path = require('path');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  devServer: {
    //allowedHosts: ['test.mydomain.com','localhost',],
    allowedHosts: ['all','test.mydomain.com'],
    //compress: true,
    port: 80,

    //http2: true,
    //client: {
      //logging: 'info',
      //progress: true,

      //reconnect: true,
    //},
    /*
    allowedHosts: [
      'localhost',
      '0.0.0.0',
      'test.mydomain.com',
      '127.0.0.1',
    ],*/
    //host: '127.0.0.1',

    //host: "0.0.0.0",
    host: 'test.mydomain.com',
    public: "0.0.0.0:80",



    //host: "0.0.0.0",
    //host: '127.0.0.1',
    //host: '0.0.0.0',
    //port: 80,
    //public: "localhost:8080",
    //public: "0.0.0.0:80",
    //public: "test.mydomain.com",
  },
  pages: {/*
    index: {
      entry: "./src/pages/Home/main.js",
      template: "public/index.html",
      title: "Anoringa",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },*/
    index: {
      entry: "./src/main.js",
      title: "Anoringa",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    l: {
      entry: "./src/pages/PostDetail/main.js",
      template: "public/index.html",
      //title: 'Post',
      chunks: ["chunk-vendors", "chunk-common", "post"],
    },
  },
  /**/
  /**/
  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: "#D2354A",
    msTileColor: "#D2354A",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    start_url: process.env.VUE_APP_URL,
    iconPaths: {
      favicon32: "./img/icons/favicon-32x32.png",
      favicon16: "./img/icons/favicon-16x16.png",
      appleTouchIcon: "./img/icons/apple-touch-icon-152x152.png",
      maskIcon: "./img/icons/safari-pinned-tab.svg",
      msTileImage: "./img/icons/msapplication-icon-144x144.png",
    },
    manifestOptions: {
      /*
      name: "Anoringa",
      short_name: "Anoringa",
*/
      name: process.env.VUE_APP_NAME,
      short_name: process.env.VUE_APP_NAME,

      theme_color: "#D2354A",
      background_color: "#D2354A",

      start_url: "/",
      display: "standalone",
      orientation: "portrait",
      lang: "es-AR",

      icons: [
        {
          src: "/icons/android-chrome-36x36.png",
          sizes: "36x36",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-256x256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    /*
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      //swSrc: "src/service-worker.js",
      swSrc: "src/sw.js",
    },
    */


    /*
    manifestPath:'/manifest.json'
    */
    // configure the workbox plugin
    /*
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./src/registerServiceWorker.js",
      // ...other Workbox options...
    }*/
  },
};
