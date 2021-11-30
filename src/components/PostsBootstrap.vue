<template>
  <main class="container-flex" id="projects" v-if="loaded == 'OK'">
    <!--
    <head>
      <title>{{ "process.env.VUE_APP_NAME" + " | Posts" }}</title>
    </head>
            -->

    <div class="row pl-0 pr-0 mr-0 ml-0">
      <!--
      <div class="">
              </div>
            -->
      <!--
            v-for="item in orderBy(posts, postSort, -1)"
            orderBy(posts,'updateAT',-1)
          v-if="item.enabled == true"
            -->
      <a
        v-for="item in filterPostsByEnabledAndSortByVar"
        :key="item._id"
        :id="item._id"
        :href="urlendpoint + item._id"
        class="
          col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 col-12
          project-card-wrapper
        "
      >
        <div
          class="col-12 project-card"
          v-bind:style="{
            /*
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover / cover',
            //'background-image': 'rgb(255, 255, 255) url(' + getPhoto(item.photo) + ') no-repeat scroll left center / cover',
            'background-image': 'url(' + getPhoto(item.photo) + ') ',
            //'background-image': 'url(' + getPhoto(item.photo) + ') no-repeat scroll left center / cover',
            */
            background:
              'rgb(255, 255, 255) url(' +
              getPhoto(item.photo) +
              ') no-repeat scroll center / cover',
          }"
        >
          <div class="project-card-content">

            <h4 class="cardtitle">{{ item.title }}</h4>
            <!--
            <h4>
              <b>
                {{ item.title }}
              </b>
            </h4>
            -->
            <div class="h-100 d-inline-block pb-3">
              <div v-if="postSort == 'lastComment'">
                <p v-if="item[postSort] == ['2020-11-30T00:00:00.000Z']"></p>
                <p v-else>
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                  comentado {{ item[postSort] | moment }}
                </p>
              </div>
              <div v-else-if="postSort == 'countOfComments'">
                <b-icon icon="chat-left-text" aria-hidden="true"></b-icon>
                {{ item.countOfComments }} comentarios
              </div>
              <div v-else-if="postSort == 'updatedAt'">
                <p>
                  <b-icon icon="chat-left-text" aria-hidden="true"></b-icon>
                  {{ item.countOfComments }}
                  <b-icon icon="pen" aria-hidden="true"></b-icon>
                  por: {{ item.owner.username }}
                </p>
              </div>
              <div v-else>
                <b-icon icon="clock" aria-hidden="true"></b-icon>
                {{ item[postSort] | moment }}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </main>
  <div v-else-if="loaded == false" class="loadOrError">
    Cargando
    <b-spinner variant="danger" key="danger"></b-spinner>
  </div>
  <div v-else-if="loaded == 'ERROR'" class="loadOrError">ERROR</div>
</template>





<script>
//role="list"
//grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
//px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20
//import History from "./History";
//import { mapGetters } from "vuex";
//import Card from "./Card";
import { EventBus } from "../event-bus";

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
  /*
  computed: {
    filteredOfficialScenarios() {
      return posts
        .filter(s => new Date(s.updatedAt) >= START_DATE)
        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
      );
    },
  },*/
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
    //CardPostBox: Card,
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
    getPhoto(photosonic) {
      //console.log("typeof photosonic");
      //console.log(typeof photosonic);
      function validURL(str) {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str);
      }

      // Photo object vs media
      if (typeof photosonic === "object" || photosonic instanceof Object) {
        //console.log("the image coms from object");
        if (validURL(photosonic.content)) {
          return photosonic.content;
        } else {
          return this.photosonicdefault;
        }
      } else if (
        typeof photosonic === "string" ||
        photosonic instanceof String
      ) {
        //console.log("the image coms from string");
        if (validURL(photosonic)) {
          return photosonic;
        } else {
          return this.photosonicdefault;
        }
      } else {
        console.log("anyone know the image coms from ");
      } /*else {
        console.log("anyone know the image coms from ");
        if (validURL(photosonic.content)) {
          return photosonic.content;
        } else {
          return this.photosonicdefault;
        }
      }
      if (photosonic.content) {
        if (validURL(photosonic.content)) {
          return photosonic.content;
        } else {
          return this.photosonicdefault;
        }
      }
      else{
        if (validURL(photosonic.content)) {
          return photosonic;
        } else {
          return this.photosonicdefault;
        }

      }*/
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

<style lang="postcss" scoped>
/*
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");
https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css
*/
</style>
<style scoped>
</style>


<style lang="postcss">
/*
@tailwind base;
@tailwind components;
@tailwind utilities;
*/
</style>

    <style>
#projects {
  /*
        padding: 5%;
        */
  padding: 1%;
  background-color: #dae0e6;
}

@media only screen and (min-width: 600px) {
  .project-card-wrapper {
    /*
        margin: 3% 0%;
        */
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
  /*
        background: rgb(255, 255, 255) url(https://picsum.photos/537/350)
          no-repeat scroll left center / cover;
          */
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


.cardtitle{
  /*
  */
  font-weight: bold;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 1440px) and (min-width: 1200px) {
  .cardtitle {
    /*
    background: red;
    */
    font-weight: initial;
    font-size: 1.3rem;
    
    /*
    width: 90%;
    margin-left: 5% !important;
    margin-right: 5% !important;
    */
  }
}



</style>