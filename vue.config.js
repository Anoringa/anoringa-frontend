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
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'l': {
      entry: './src/pages/PostDetail/main.js',
      template: 'public/index.html',
      title: 'Post',
      chunks: [ 'chunk-vendors', 'chunk-common', 'post' ]
    }
  }
  /**/
};

