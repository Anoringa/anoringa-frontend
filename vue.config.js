module.exports = {
  devServer: {
    //host: '127.0.0.1',
    host: "test.mydomain.com",
    port: 80,
    //public: "localhost:8080",
    public: "localhost:80",
  },
  pages: {
    'index': {
      entry: './src/pages/Home/main.js',
      template: 'public/index.html',
      title: 'Anoringa',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'l': {
      entry: './src/pages/PostDetail/main.js',
      template: 'public/index.html',
      //title: 'Post',
      chunks: [ 'chunk-vendors', 'chunk-common', 'post' ]
    }
  },
  /**/
  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: "#f0354b",
    msTileColor: '#f0354b',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    start_url: process.env.VUE_APP_URL,
    iconPaths: {
      favicon32: './img/icons/favicon-32x32.png',
      favicon16: './img/icons/favicon-16x16.png',
      appleTouchIcon: './img/icons/apple-touch-icon-152x152.png',
      maskIcon: './img/icons/safari-pinned-tab.svg',
      msTileImage: './img/icons/msapplication-icon-144x144.png'
    },/*
    manifestPath:'/manifest.json'*/
    
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./src/registerServiceWorker.js",
      // ...other Workbox options...
    }
  }
};

