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
      title: 'Post',
      chunks: [ 'chunk-vendors', 'chunk-common', 'post' ]
    }
  },
  /**/
  pwa: {
    name: 'Anoringa',
    themeColor: "#f0354b",
    msTileColor: '#f0354b',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    start_url: '/',
    iconPaths: {
      favicon32: './public/icons/favicon-32x32.png',
      favicon16: './public/icons/favicon-16x16.png',
      appleTouchIcon: './public/icons/apple-touch-icon-152x152.png',
      maskIcon: './public/icons/safari-pinned-tab.svg',
      msTileImage: './public/icons/msapplication-icon-144x144.png'
    },/*
    manifestPath:'/manifest.json'*/
  }
};

