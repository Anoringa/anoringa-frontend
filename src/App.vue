<template>
  <div id="app">
    <head>
      <title>
        {{ "process.env.VUE_APP_NAME" + " | Comenta y postea anonimamente" }}
      </title>
    </head>
    <router-view />
    <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  --></div>
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = process.env.VUE_APP_NAME;
    this.showToast();
  },

    data() {
      return {
        count: 0
      }
    },
  methods: {
    toast() {
      this.$bvToast.toast(`Toast with action link`, {
        href: "#foo",
        title: "Example",
      });
    },
    showToast() {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      this.count++;
      // Create the message
      const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
        h("b-spinner", { props: { type: "grow", small: true } }),
        " Flashy ",
        h("strong", "toast"),
        ` message #${this.count} `,
        h("b-spinner", { props: { type: "grow", small: true } }),
      ]);
      // Create the title
      const vNodesTitle = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
        [
          h("strong", { class: "mr-2" }, "The Title"),
          h("small", { class: "ml-auto text-italics" }, "5 minutes ago"),
        ]
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        autoHideDelay: 5000,
        variant: "info",
      });
    },
  },
  metaInfo: {
    //description:"Anoringa es un sitio en el que podras discutir anonimamente",
    title: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
    meta: [
      {
        vmid: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
        name: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
        content: "Anoringa es un sitio en el que podras discutir anonimamente",
      },
      { charset: "utf-8" },
      /*
      {
        name: "description",
        content: "Anoringa es un sitio en el que podras discutir anonimamente.",
      },*/
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Anoringa es un sitio en el que podras discutir anonimamente",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "Argentina, Latinoamerica, Español, Comunidad, Anonimo",
      },
      {
        hid: "author",
        name: "author",
        content: "?",
      },
      //<meta name="author" content="John Doe">
    ],
    // override the parent template and just use the above title only
    titleTemplate: false,
    htmlAttrs: {
      lang: "es-AR",
      amp: true,
    },
  } /*
  metaInfo: {
    title: "My Example App",
    titleTemplate: "%s - Yay!",
    htmlAttrs: {
      lang: "es",
      amp: true
    }
  }*/,

  /*
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: process.env.VUE_APP_NAME,
    // all titles will be injected into this template
    titleTemplate:
      process.env.VUE_APP_NAME + "%s | Comenta y postea anonimamente",
  },*/
  /*
  metaInfo: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    title: process.env.VUE_APP_NAME,
    titleTemplate: "%s - Yay!",
    htmlAttrs: {
      lang: "es",
      amp: true,
    },
  },*/
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
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "Buscar";
}
.custom-file-input:lang(es) ~ .custom-file-label::after {
  content: "Buscar";
}
</style>