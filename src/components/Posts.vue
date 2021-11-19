<template>
  <main class="container" v-if="loaded == 'OK'">
    <head>
      <title>{{ "process.env.VUE_APP_NAME" + " | Posts" }}</title>
    </head>
    <div id="cards" class="card-grid">
      <!--
    
    :content="content"
    -->
      <!--
    
    :content="content"
    -->
      <!--
      <CardPostBox
        :id="id"
        :url="url"
        :photo="photo"
        :title="title"
        message="Are you sure you wish to remove this record?"
        content="Are you sure you wish to remove this record?"
        label="Remove"
        css-classes="alert"
      ></CardPostBox>
      <CardPostBox
        :id="id"
        :url="url"
        :photo="photo"
        title="Fake title"
        :content="content"
        message="Are you sure you wish to remove this record?"
        label="Remove"
        css-classes="alert"
      ></CardPostBox>
    
    -->

      <CardPostBox
        v-for="item in orderBy(posts, 'updatedAt', -1)"
        :key="item._id"
        :id="item._id"
        :url="url"
        :photo="item.photo"
        :title="item.title"
        :content="item.description"
        message="Are you sure you wish to remove this record?"
        label="Remove"
        css-classes="alert"
      >
        <!-- content -->
      </CardPostBox>
    </div>
  </main>
  <div v-else-if="loaded == false" style="height: 100%">
    Cargando
    <b-spinner variant="danger" key="danger"></b-spinner>
  </div>
  <div v-else-if="loaded == 'ERROR'" style="height: 100%">ERROR</div>
</template>





<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Card from "./Card";
import { EventBus } from "../event-bus";

import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
import Vue2Filters from "vue2-filters";

export default {

  name: "Posts",
  
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
      title: "some title",
      content: "some scrap contenido",
    };
  },
  components: {
    CardPostBox: Card,
  },

  created() {
    this.getAllPosts();
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

    EventBus.$on("sendPostP2P", (item, response) => {
      console.log("from other component", item, response);
      this.posts.push(response);
    });

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



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
* {
  margin: 0;
  padding: 0;
}

body {
  background: #e2e1e0;
}
/*
#index {
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 50px;
}

body {
  margin: 0;
  color: $dark;
  background: $bright;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
  font-size: 14px;
  > header {
    width: 100%;
    padding: 0.5rem 0;
    background: $darker;
    color: $bright;
    position: fixed;
    z-index: 1;
    > .container {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  > footer {
    background-color: $darker;
    color: $bright;
    padding: 1rem;
    text-align: center;
  } // End Footer
}

*/

$darker: #222;
$dark: #555;
$bright: #ddd;

* {
  box-sizing: border-box;
  margin: 0;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
}
a {
  text-decoration: none;
  &:hover {
  }
}

nav {
  padding: 0.5rem 0;
  a {
    color: $bright;
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
  ul {
    list-style: none;
    display: flex;
    li {
      padding-left: 1rem;
    }
  }
}
/*
main {
  padding-top: 5rem;
  padding-bottom: 3rem;
}
*/
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.card-grid {
  text-align: center;
  font: 14px/1.4 sans-serif;
  //display: grid;
  // grid-template-columns: repeat(3, minmax(200px, 1fr));
  //grid-gap: 1rem;
}

// Responsive
@media (max-width: 768px) {
  .card-grid {
    //grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}
@media (max-width: 540px) {
  .card-grid {
    //grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
}
</style>