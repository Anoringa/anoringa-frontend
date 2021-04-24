<template>
  <div id="index">
    <Header :appName="appName"></Header>
    <!--
      <p>{{appName}}</p>
    -->
    <!--
  <div style="margin: 0 auto; width:100%; height:1500px;">
    <object type="text/html" data="/politicas.html"
            style="width:100%; height:100%!important; margin:1%;">
    </object>
</div>
<iframe style="width:100%; height:100%!important; margin:1%;" src="/politicas.html"></iframe>
<embed src="/politicas.html" width="100%" height="100%">
    -->



      <iframe width="100%" class="pb-0 pt-0 mb-0" style="width:100%; height:100vh;"
         src="https://anoringa.github.io/anoringa-docs" allowfullscreen>
      </iframe>

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
  head: {
    title: {
      inner: "My title",
      separator: "-",
      complement: "My Complement",
    },
    //omited
  },
  metaInfo() {
    const title = process.env.VUE_APP_NAME + " | Comenta y postea anonimamente";

    const content = "Anoringa es un sitio en el que podras discutir anonimamente";
    const link = process.env.VUE_APP_URL;
    const photolink = process.env.VUE_APP_URL + "/" + "anoringa.png";
    const app_name = process.env.VUE_APP_NAME;

    return {
      //title: process.env.VUE_APP_NAME + " | " + title.substring(0,50),
      title: title,
      //content: "Anoringa es un sitio en el que podras discutir anonimamente.",
      //content: content.substring(0,100) + " | " + process.env.VUE_APP_NAME,
      // override the parent template and just use the above title only
      titleTemplate: null,
      meta: [
        {
          vmid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          vmid: "og:description",
          property: "og:description",
          content: content,
        },
        {
          vmid: "og:image:alt",
          property: "og:image:alt",
          content: photolink,
        },
        {
          vmid: "og:url",
          property: "og:url",
          content: link,
        },
        {
          vmid: "og:image",
          property: "og:image",
          content: photolink,
        },
        {
          vmid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          vmid: "og:locale",
          property: "og:locale",
          content: "es-ar",
        },
        {
          vmid: "og:site_name",
          property: "og:site_name",
          content: app_name,
        },

        {
          name: "description",
          //content: title,
          content: content + " | " + process.env.VUE_APP_NAME,
        } /*
        {  vmid: "title", 
        name: "title", 
        //content:  process.env.VUE_APP_NAME +" | "+ " Post", 
        content: title.substring(0,50) + " | " + process.env.VUE_APP_NAME,
        },*/,
        {
          vmid: "description",
          name: "description",
          content: content,
        },
      ],
    };
  },
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
      appName: "Anoringa",
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
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