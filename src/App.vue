<template>
  <div :class="isDarkModeEnabled ? 'theme--dark' : 'theme--light'">
    <div id="app">
      <head>
        <title>
          {{ "process.env.VUE_APP_NAME" + " | Comenta y postea anonimamente" }}
        </title>
      </head>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = process.env.VUE_APP_NAME;
    //this.showToast();
    this.analytics();
  },

  data() {
    return {
      count: 0,
      isDarkModeEnabled: localStorage.getItem("darkMode") === "true",
    };
  },
  mounted() {
    window.addEventListener("toggleDarkMode", () => {
      this.isDarkModeEnabled = localStorage.getItem("darkMode") === "true";
    });
  },
  methods: {
    analytics() {
      /*
      if (
        !sessionStorage.getItem("_swa") &&
        document.referrer.indexOf(location.protocol + "//" + location.host) !==
          0
      ) {
        fetch(
          "https://counter.dev/track?" +
            new URLSearchParams({
              referrer: document.referrer,
              screen: screen.width + "x" + screen.height,
              user: "chocomilk",
              utcoffset: "-3",
            })
        );
      }
      console.log("analytics");
      sessionStorage.setItem("_swa", "1");
      */
      //console.log("analytics");
      let script = document.createElement("script");
      script.text =
        'if(!sessionStorage.getItem("_swa")&&document.referrer.indexOf(location.protocol+"//"+location.host)!== 0){fetch("https://counter.dev/track?"+new URLSearchParams({referrer:document.referrer,screen:screen.width+"x"+screen.height,user:"chocomilk",utcoffset:"-3"}))};sessionStorage.setItem("_swa","1");';
      //script.src = "";
      document.head.appendChild(script);
    },

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
        " haz click ",
        //h("a",{href: "/reportar"}, "aqui"),
        h("a", { attrs: { name: "reportar", href: "/" + "reportar" } }, "aqui"),
        ` message #${this.count} `,

        h("b-spinner", { props: { type: "grow", small: true } }),
      ]);
      // Create the title
      const vNodesTitle = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
        [
          h("strong", { class: "mr-2" }, "Dejanos tus sugerencias"),
          h(
            "small",
            { class: "ml-auto text-italics" },
            "atte: los desarrolladores"
          ),
        ]
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 50000,
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

<style lang="scss">
.input-form {
  @include dynamic-theme() {
    background-color: theme($background1-color);
    color: theme($foreground1-color);
    border-color: theme($border-color);
  }

  &:hover,
  &:active,
  &:focus {
    @include dynamic-theme() {
      background-color: theme($background1-color);
      color: theme($foreground1-color);
      border-color: theme($border-color);
    }
  }
}
.input-group-text {
  @include dynamic-theme() {
    background-color: theme($background-color);
    color: theme($foreground1-color);
    border-color: theme($border-color);
  }
}
</style>

<style lang="scss">
p,
span,
h1,
h2,
h3,
h4,
h5,
h6 {
  @include dynamic-theme() {
    color: theme($foreground-color);

    &::selection,
    &::-moz-selection {
      background-color: theme($primary-color);
      color: theme($foreground-color);
    }
  }
}

blockquote,
li,
label,
small {
  @include dynamic-theme() {
    color: theme($foreground1-color);

    &::selection,
    &::-moz-selection {
      background-color: theme($primary-color);
      color: theme($foreground-color);
    }
  }
}
</style>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

#app {
  min-height: 100vh;

  @include dynamic-theme() {
    background-color: theme($background1-color);
  }
}

.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "Buscar";
}
.custom-file-input:lang(es) ~ .custom-file-label::after {
  content: "Buscar";
}
</style>