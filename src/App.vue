<template>
  <div id="app">
    <router-view />
    <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  --></div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Default Title",
    // all titles will be injected into this template
    titleTemplate: "%s | My Awesome Webapp",
  },
};
</script>

<style src="vodal/common.css">
/* global styles */
</style> 
<style src="vodal/rotate.css">
/* global styles */
</style> 

<style lang="scss" scoped>
// include animation styles
//@import "vodal/common.css";
//@import "vodal/rotate.css";

#app {
  //width: 80%;
  margin: 0px;
  padding: 0px;
  text-align: center;
}

@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

//@import '../node_modules/bootstrap/dist/css/bootstrap.css';
//@import "node_modules/bootstrap-vue/src/index.scss";
/*
body {
   overflow-x: hidden !important;
}
#app {
   overflow-x: hidden !important;
}
#app {
  //width: 80%;
  margin: 0px;
  padding: 0px;
  text-align: center;
}
*/
</style>