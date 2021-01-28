  export const myVar = 'This is my variable'
  //console.log(process.env)
  export const Settings = {
    VUE_APP_NAME    : process.env.VUE_APP_NAME,
    VUE_APP_URL     : process.env.VUE_APP_URL,
    API_HOST        : process.env.API_HOST,
    API_HOST_SOCKET : process.env.API_HOST_SOCKET
  }