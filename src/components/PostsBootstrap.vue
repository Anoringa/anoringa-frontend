<template>
  <main class="container-flex" id="projects" v-if="loaded == 'OK'">
    <div class="row pl-0 pr-0 mr-0 ml-0">
      <Card
        v-for="item in filterPostsByEnabledAndSortByVar"
        :key="item._id"
        :id="item._id"
        :urlEndpoint="urlendpoint + item._id"
        :photo="item.photo"
        :title="item.title"
        :postSort="postSort"
        :lastComment="item[postSort]"
        :countOfComments="item.countOfComments"
        :authorUsername="item.owner.username"
      />
    </div>
  </main>
  <div v-else class="idle-wrapper">
    <div v-if="loaded == false" class="loader">
      <b-spinner
        variant="primary"
        style="width: 4rem; height: 4rem"
      ></b-spinner>
    </div>

    <div v-else-if="loaded == 'ERROR'" class="loadOrError">ERROR</div>
  </div>
</template>





<script>
//role="list"
//grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
//px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20
//import History from "./History";
//import { mapGetters } from "vuex";
//import Card from "./Card";
import { EventBus } from "../event-bus";
import Card from "./Card.vue";

import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
import Vue2Filters from "vue2-filters";

import moment from "moment";
moment.locale("es");

export default {
  props: {
    postSort: {
      required: false,
      default: "updatedAt",
    },
  },
  computed: {
    filterPostsByEnabled: function () {
      return this.posts.filter((postu) => postu.enabled);
    },
    filterProductsByCategory: function () {
      return this.products.filter(
        (product) => !product.category.indexOf(this.category)
      );
    },
    filterPostsByEnabledAndSortByUpdatedAt() {
      return this.posts
        .filter((s) => s.enabled)
        .sort((a) => new Date(a.updatedAt));
    },
    filterPostsByEnabledAndSortByVar() {
      if (this.postSort == "updatedAt") {
        return this.posts
          .filter((s) => s.enabled)
          .sort((a) => a[this.postSort] - 1);
      } else if (this.postSort == "countOfComments") {
        return this.orderBy(this.posts, "countOfComments", -1).filter(
          (s) => s.enabled
        );
      } else if (this.postSort == "lastComment") {
        return this.orderBy(this.posts, "lastComment", -1).filter(
          (s) => s.enabled
        );
      } else {
        return this.orderBy(this.posts, this.postSort, -1).filter(
          (s) => s.enabled
        );
      }
    },
    filterPostsByEnabledAndSortByVarOld() {
      return this.posts
        .filter((s) => s.enabled)
        .sort((a) => new Date(a.updatedAt))
        .reverse();
    },
  },
  name: "Posts",

  metaInfo() {
    const title = process.env.VUE_APP_NAME + " | Comenta y postea anonimamente";

    const content =
      "Anoringa es un sitio en el que podras discutir anonimamente";
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
          content: "es_AR",
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
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      loaded: false,
      posts: [],
      postexample: [],
      //endpoint: "http://localhost:3000/api/post",
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post",
      endpoint: process.env.VUE_APP_API + "/api/post/new",
      //endpoint: "http://localhost:3000/api/post",
      examplesource: "https://jsonplaceholder.typicode.com/posts/",

      id: "asdasdasd",
      url: "asdasdasd",
      photo: "https://picsum.photos/200?random=1",
      photosonicdefault: "https://picsum.photos/200?random=1",
      title: "some title",
      content: "some scrap contenido",
      postlink: "/post/" + this.id,
      urlendpoint: "/post/",
    };
  },
  components: {
    Card,
  },

  created() {
    this.moment = moment;
    this.getAllPosts();
    this.showToast();

    console.log("tipo de orden para los post: ", this.postSort);
  },
  filters: {
    moment: function (date) {
      //return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      //console.log("postdate: ",date)
      return moment(date).fromNow();
    },
    momentHaceCuanto: function (date) {
      //return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      return moment(date).fromNow();
      //return moment(date).fromNow();
    },
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    post: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      );

      //  :key="item._id""item._id" "url" "photo" title description

      //this.item = ['<CardPostBox :id="id" :url="url" :photo="photo" :title="new message socket" message="Are you sure you wish to remove this record?" content="Are you sure you wish to remove this record?" label="Remove" css-classes="alert" ></CardPostBox>'];
      this.posts.push(data);
    },
  },
  mounted() {
    /*
            window.EventHandler.listen('remove-dialog-' + this.id + '-called', (data) => {
                window.location.reload(true);
                console.log(data);
            });*/
    /*
    this.$root.$on("component1", () => {
      // your code goes here
      //this.c1method()
      console.log("from other component");
    });
    this.$window.Evento.$on("sendPostP2P", (item, response) => {
      // your code goes here
      //this.c1method()
      console.log("from other component",item, response);
      this.posts.push(response);
    });*/

    EventBus.$on("sendPostP2P", (response) => {
      console.log("from other component", "item");
      console.log("also from other component", response);

      this.posts.push(response);
      console.log("your saved posts", this.posts);
    });
    /*
    EventBus.$on("sendPostP2P", (item, response) => {
      console.log("from other component", item);
      console.log("also from other component", response);
      
      this.posts.push(response);
      console.log("your saved posts",this.posts);
    });
    */
    /*
    
    window.Evento.$on("sendPostP2P", (item, response) => {
      // your code goes here
      console.log("from other component",item, response);
      this.posts.push(response);
    });
    */
    /**/
  },
  methods: {
    showToast() {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      this.count++;
      // Create the message
      const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
        h("b-spinner", { props: { type: "grow", small: true } }),
        " haz click",
        //h("a",{href: "/reportar"}, "aqui"),
        h(
          "a",
          { attrs: { name: "reportar", href: "/" + "reportar" } },
          " aqui "
        ),
        //` message #${this.count} `,

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
        autoHideDelay: 15000,
        variant: "info",
      });
    },
    getPostsExample() {
      axios
        .get(this.examplesource)
        .then((response) => {
          this.postexample = response.data;
          console.log("-----data-------");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
        });
    },
    getAllPosts() {
      axios
        .get(this.endpoint, {
          onDownloadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(
              "load all post completed: ",
              progressEvent.lengthComputable
            );
            console.log("load all post percentage: ", percentCompleted);
          },
        })
        .then((response) => {
          this.posts = response.data.data;
          console.log("-----posts data-------");
          console.log(response.data);
          this.loaded = "OK";
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
          this.loaded = "ERROR";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#projects {
  padding: 1%;

  @include dynamic-theme() {
    background-color: theme($background-color);
  }
}
#index {
  min-height: 100vh;
}
.idle-wrapper {
  height: calc(100vh - 250px);
  position: relative;

  @include dynamic-theme() {
    background-color: theme($background-color);
  }
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cardtitle {
  @include dynamic-theme() {
    color: theme($card-foreground-color);
  }
}
.card-metadata p {
  @include dynamic-theme() {
    color: theme($card-foreground-color);
  }
}
</style>


    <style>
#projects {
  padding: 1%;
  background-color: #dae0e6;
}

@media only screen and (min-width: 600px) {
  .project-card-wrapper {
    margin: 0.3% 0%;

    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}

.project-card::before {
  background-image: linear-gradient(
    0deg,
    #000,
    rgba(0, 0, 0, 0.8) 25%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.4) 75%,
    rgba(0, 0, 0, 0.2)
  );
  background-position: center;
  content: "";
  border-radius: 8px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.project-card {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  margin-top: 2%;
  min-width: 12em;
  min-height: 15em;
  border-radius: 8px;
}
.project-card:hover {
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.5), 0 4px 20px 0 rgba(0, 0, 0, 0.49);
}
.project-card-content {
  color: white;
  opacity: 1;
  position: absolute;
  bottom: 0px;
  text-overflow: ellipsis;
}

.cardtitle {
  /*
  */
  font-weight: bold;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 1440px) and (min-width: 1200px) {
  .cardtitle {
    font-weight: initial;
    font-size: 1.3rem;
  }
}
</style>