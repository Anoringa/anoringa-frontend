<template>
  <main class="" v-if="loaded == 'OK'">
    <head>
      <title>{{ "process.env.VUE_APP_NAME" + " | Posts" }}</title>
    </head>

    <section class="container-flex" id="projects">
      <div class="row">
        <a
          v-for="item in orderBy(posts, 'updatedAt', -1)"
          :key="item._id"
          :id="item._id"

          :href="urlendpoint+item._id"
          target="_blank"
          class=" col-sm-6	col-md-4 col-lg-3 col-xl-2 col-xxl-1 col-12 project-card-wrapper"
          

        >
          <div class="col-12 project-card"
                    v-bind:style="{
            /*
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover / cover',
            //'background-image': 'rgb(255, 255, 255) url(' + getPhoto(item.photo) + ') no-repeat scroll left center / cover',
            'background-image': 'url(' + getPhoto(item.photo) + ') ',
            //'background-image': 'url(' + getPhoto(item.photo) + ') no-repeat scroll left center / cover',
            */
            'background': 'rgb(255, 255, 255) url(' + getPhoto(item.photo) + ') no-repeat scroll center / cover',

          }">
            <div class="project-card-content">
              <h4>
                <b>
                  {{item.title}}
                </b>
              </h4>
              <!--
              <p>
                {{item.description}}
              </p>
              -->
              <p>
                ❤ 0 💬 {{item.numberOfColors}} 🕔 {{item.updatedAt | moment }}
              </p>
              <!--
              <p>
                <i class="fa fa-heart" aria-hidden="true"></i> 1
                <i class="fa fa-comment" aria-hidden="true"></i> 2
                <i class="fa fa-clock-o" aria-hidden="true"></i> 15 min ago
              </p>
            --></div>
          </div>
        </a>
      </div>
    </section>

  </main>
  <div v-else-if="loaded == false" style="height: 100%">
    Cargando
    <b-spinner variant="danger" key="danger"></b-spinner>
  </div>
  <div v-else-if="loaded == 'ERROR'" style="height: 100%">ERROR</div>
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
import Vue2Filters from "vue2-filters";

import moment from "moment";
moment.locale("es");

export default {
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
      endpoint: process.env.VUE_APP_API + "/api/post/",
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
  },
  filters: {
    moment: function (date) {
      //return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      return moment(date).fromNow();
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
    this.$window.Evento.$on("createImage", (item, response) => {
      // your code goes here
      //this.c1method()
      console.log("from other component",item, response);
      this.posts.push(response);
    });*/

    EventBus.$on("createImage", (item, response) => {
      console.log("from other component", item, response);
      this.posts.push(response);
    });

    /*
    
    window.Evento.$on("createImage", (item, response) => {
      // your code goes here
      console.log("from other component",item, response);
      this.posts.push(response);
    });
    */
    /**/
  },
  methods: {
    getPhoto(photosonic) {
      console.log("typeof photosonic");
      console.log(typeof photosonic);
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
        console.log("the image coms from object");
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
            console.log(progressEvent.lengthComputable);
            console.log(percentCompleted);
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
      .project-card-wrapper {
        /*
        margin: 3% 0%;
        */
        margin: 0.3% 0%;
        padding-left: 8px!important;
        padding-right: 8px!important;
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
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
          0 2px 10px 0 rgba(0, 0, 0, 0.12);
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
        box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.5),
          0 4px 20px 0 rgba(0, 0, 0, 0.49);
      }
      .project-card-content {
        color: white;
        opacity: 1;
        position: absolute;
        bottom: 0px;
      }
    </style>