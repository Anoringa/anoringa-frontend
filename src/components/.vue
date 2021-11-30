<template>
  <div id="index">
    <Header :appName="appName"></Header>
    <!--
      <p>{{appName}}</p>
    -->
    <Posts></Posts>
    <Footer></Footer>
  </div>
</template>


<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Header from "./Header";
import Posts from "./Posts";
import Footer from "./Footer";
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
  name: "Index",
  components: {
    //History,
    Header,
    Posts,
    Footer,
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



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

$darker: #222;
$dark: #555;
$bright: #ddd;

#index {
  //width: 80%;
  margin: 0px;
  padding: 0px;
  text-align: center;
}
.loadOrError {
  text-align: center;
  height: 100%;
}
/*
html{
  margin: 0px;
  padding: 0px;
}
body{
  margin: 0px;
  padding: 0px;
}
body {
  margin: 0;
  color: $dark;
  background: $bright;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
  font-size: 14px;
}

* {
  margin: 0;
  padding: 0;
}
#index {
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 50px;
}
*/
</style>