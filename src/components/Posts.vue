<template>
  <main class="container">
    <div id="cards" class="card-grid">
      <!--
    
    :content="content"
    -->
      <!--
    
    :content="content"
    -->
      <!--
      <call-dialog-link
        :id="id"
        :url="url"
        :photo="photo"
        :title="title"
        message="Are you sure you wish to remove this record?"
        content="Are you sure you wish to remove this record?"
        label="Remove"
        css-classes="alert"
      ></call-dialog-link>
      <call-dialog-link
        :id="id"
        :url="url"
        :photo="photo"
        title="Fake title"
        :content="content"
        message="Are you sure you wish to remove this record?"
        label="Remove"
        css-classes="alert"
      ></call-dialog-link>
    
    -->

      <call-dialog-link
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
      </call-dialog-link>
    </div>
  </main>
</template>





<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Card from "./Card";
import { EventBus } from "../event-bus";

import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
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
    "call-dialog-link": Card,
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

      //this.item = ['<call-dialog-link :id="id" :url="url" :photo="photo" :title="new message socket" message="Are you sure you wish to remove this record?" content="Are you sure you wish to remove this record?" label="Remove" css-classes="alert" ></call-dialog-link>'];
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
        .get(this.endpoint)
        .then((response) => {
          this.posts = response.data.data;
          console.log("-----posts data-------");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
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