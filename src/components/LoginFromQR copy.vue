<template>
  <div id="index">
    <Header :appName="appName"></Header>

    <div>login status</div>
    <div>token</div>
    <p>{{token}}</p>
    <!--
    <Footer></Footer>
    -->
  </div>
</template>


<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Header from "./Header";
//import Docs from "../pages/Docs/Docs";
//import Footer from "./Footer";
export default {
  /*
  metaInfo: {
    title: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
    meta: [
      {
        vmid: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
        name: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
        content: "Anoringa es un sitio en el que podras discutir anonimamente",
      },
      { charset: "utf-8" },
      {
        name: "description",
        content: "An example Vue application with vue-meta.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        vmid: "description",
        name: "description",
        content: "Anoringa es un sitio en el que podras discutir anonimamente",
      },
    ],
    // override the parent template and just use the above title only
    titleTemplate: false,
    htmlAttrs: {
      lang: "es-AR",
      amp: true,
    },
  },*/
  name: "DocsPage",
  components: {
    //History,
    Header,
    //Docs,
    //Footer,
  },
  data() {
    return {
      token: this.$route.params.token,
      loading: false,
    };
  },
  methods: {
    clickConvert() {},
    convert() {},
  },
};
</script>



<style lang="css" scoped>
iframe {
/*
position:absolute;
top:0px;
*/
bottom:0px;
left:0px;
right:0px;
overflow:auto; /* coz you need vertical and horizontal scrollbars */
}
</style>