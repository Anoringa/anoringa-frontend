<template>
  <main class="maindiv">
    <div v-if="loaded_correctly === true">
      <!--
      Post id : {{ $route.params.id }}
      -->

      <Header :appName="appName"></Header>
      <!-- 
      
      <nav
        class="navbar navbar-expand navbar-dark bg-danger justify-content-between"
      >
        <a class="navbar-brand" href="/">Back to Anoringa</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContentAW"
          aria-controls="navbarSupportedContentAW"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div>
          hola jorge
          <b-dropdown
            id="dropdown-right"
            right
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <img
                type="button"
                src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/logo_white.png"
                width="30"
                height="30"
                alt="logo"
                class="dropdown-toggle"
                data-toggle="dropdown"
              />
            </template>
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
          </b-dropdown>
        </div>
      </nav>
-->
      <div class="container-fluid">
        <!--
    <h1>Some Anoringa Post</h1>
    <p>Resize the browser window to see the effect.</p>
    <p>The columns will automatically stack on top of each other when the screen is less than 576px wide.</p>
    -->
        <!-- 
        <b-row class="mb-12">
          <b-col lg="6" class="p-3 bg-info">md="4"</b-col>
          <b-col lg="6" class="ml-auto p-3 bg-info">md="4" .ml-auto</b-col>
        </b-row>
-->
        <b-row class="mb-12 pt-5 pb-5">
          <b-col lg="6" style="background-color: lavender">
            <div>
              <img
                :src=" photo ? photo :  photodefault "
                class="img-fluid post-img"
                alt="Responsive image"
              />

              <!-- 
              <img
              
                :src="[
                photo
                  ? {
                      'background-image':
                        'url(' + photo + '), url(' + photodefault + ')',
                    }
                  : { 'background-image': 'url(' + photodefault + ')' },
              ]"
                class="img-fluid post-img"
                alt="Responsive image" />
                -->
            </div>

            <h2 class="p-3" style="text-align: left">
              {{ title }}
            </h2>

            <pre class="pb-5" style="text-align: left; overflow: inherit">{{
              content
            }}</pre>
            <!--
              pt-2 pb-5 pl-3
                src="https://www.w3schools.com/bootstrap4/cinqueterre.jpg"
              word-break: normal|break-all|keep-all|break-word|initial|inherit;

            <p>
              Bacon ipsum dolor sit amet capicola ball tip beef ribs leberkas,
              turkey biltong salami shoulder ribeye. Leberkas chuck cow
              andouille kevin ribeye pork strip steak pork chop beef ribs beef
              ball tip corned beef. Leberkas prosciutto brisket, short ribs
              salami cow sirloin chicken. Bacon pork belly bresaola tenderloin
              biltong leberkas. Strip steak beef leberkas sirloin, venison
              turkey hamburger kevin. Drumstick chicken ground round t-bone
              flank fatback jerky ball tip. Jerky ribeye sirloin t-bone.
            </p>

            <p>
              Tongue prosciutto pork ball tip ham hock, meatball sirloin brisket
              kielbasa biltong doner shoulder bresaola. Chuck beef ribs biltong,
              kielbasa ground round swine andouille corned beef. Venison
              hamburger tongue shank. Leberkas doner pork chop sausage kielbasa
              pancetta, biltong brisket pastrami tenderloin boudin filet mignon
              sirloin cow meatloaf. Ham ball tip bacon pork belly sirloin.
            </p>

            <p>
              Shoulder pig short ribs, salami chicken venison bresaola.
              Frankfurter meatball pork chop pork loin, turkey strip steak
              kielbasa pork belly drumstick shank prosciutto. Pork chicken
              ground round, sirloin tri-tip ham hock pork chop cow meatloaf pork
              loin bresaola turkey. Prosciutto hamburger pork short ribs flank
              tri-tip chicken pig bacon meatloaf t-bone shankle doner. Bresaola
              doner spare ribs biltong jowl boudin, tri-tip pork leberkas ham
              hock filet mignon.
            </p>

            <p>
              Leberkas strip steak shoulder meatball, flank biltong shank
              fatback ball tip swine prosciutto hamburger. Jerky frankfurter
              drumstick, ham ham hock hamburger kevin kielbasa salami chuck.
              Flank rump beef cow, beef ribs meatball ball tip jowl bacon pork
              chop. Biltong tongue pork chop hamburger. Frankfurter tri-tip
              pancetta pork chop venison t-bone andouille beef ribs salami
              boudin meatball doner spare ribs. Brisket pork chop pig kielbasa
              jerky chuck pork belly beef meatball boudin short loin. Doner
              jerky andouille ham meatloaf prosciutto kevin pork belly short
              loin pancetta.
            </p>

            <p>
              Corned beef spare ribs hamburger pork tenderloin flank pork loin
              beef ribs sausage brisket chicken venison bacon short loin
              sirloin. Ribeye tail short ribs andouille kevin chicken shankle
              meatloaf, corned beef rump sirloin t-bone chuck tongue. Swine
              venison tongue, sirloin turducken drumstick bresaola strip steak
              rump. Kevin ham hock meatball tri-tip. Ground round leberkas pig
              beef salami strip steak meatball beef ribs. Chicken ball tip rump,
              short loin bresaola pork t-bone jerky jowl pork chop tail chuck
              sausage prosciutto.
            </p>
            -->
          </b-col>
          <b-col lg="6" style="background-color: lavenderblush">
            <h2 class="p-2">Comentarios</h2>
            <div style="width: 100%">
              <form class="pt-3">
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      name="pswd"
                    />
                  </div>
                </div>
              </form>
              <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea class="form-control" rows="5" id="comment"></textarea>
                <div id="comentarios" class="pt-3"></div>
                <div v-if="comentariosList !== null">
                  <div
                    class="repo"
                    style="text-align: left"
                    v-for="currentComent in comentariosList"
                    :id="currentComent.id"
                    :key="currentComent.id"
                  >
                    <div class="stats">
                      <a class="pr-1" :href="'#' + currentComent.id"
                        >@{{ currentComent.id }}</a
                      >por {{ currentComent.username }}
                      <!-- 
                      <a v-text="currentComent.inResponseTo"></a>
                      
                        -->
                      <a v-if="currentComent.inResponseTo.length">
                        en respuesta de
                        <a
                          class="pl-1 pr-1"
                          style="text-align: left"
                          v-for="currentComentchild in currentComent.inResponseTo"
                          :key="currentComentchild"
                          :href="'#' + currentComentchild"
                          >@{{ currentComentchild }}</a
                        >
                      </a>
                    </div>
                    <p class="">{{ currentComent.content }}</p>
                    <p class="last-updated">
                      Last updated: {{ currentComent.created_at }}.
                    </p>
                  </div>

                  <!--
          id: 20949438,
          username: "lukaneco",
          content: "Hola pa, que haces",
          inResponseTo: [],
          created_at: 12312948123
                      
<div class="repo" id="20949439">
  <div class="stats">
    <a class="pr-1" href="#20949439">@20949439</a>POR raul12312 en respuesta de <a class="pl-1 pr-1" href="#20949438">@20949438</a></div><p class="">nada por suerte</p><p class="last-updated">Last updated: 3 weeks ago.</p></div>

                    -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>

        <footer>
          <p>
            <a href="#">Contact Us</a> | <a href="#">Sitemap</a> |
            <a href="#">Privacy Policy</a>
          </p>
          <p>&copy;2021 Copyright info here...</p>
        </footer>
      </div>
    </div>
    <div v-else>
      <p>no se encontro el post que estas buscando</p>
    </div>
  </main>
</template>




<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import $ from "jquery";

import Header from "./Header";
/*
      <div class="repo">
          <div class="stats">en respuesta de @sjdkdj @asdas</div>
      
          <p>just a to-do app that saves data to local storage</p>
      
          <div class="stats" style="display: inline-block;">por lukanco<p class='last-updated pl-5'
                  style="font-style:italic;display: inline-block;FLOAT:RIGHT;">Last updated: 3 weeks
                  ago.</p>
          </div>
      
      </div>
      */

//console.log(comentariosList);

var txt2 = $("<p></p>").text("Text."); // Create text with jQuery
console.log(txt2);
/*
      var txt1 = "<p>Text.</p>";        // Create text with HTML
      var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
      var txt3 = document.createElement("p");
      txt3.innerHTML = "Text.";         // Create text with DOM
      console.log(txt1, txt2, txt3);
      $(".container-fluid").append(txt1, txt2, txt3);   // Append new elements


      $("body").append("<p>Text.</p>")
      */

import axios from "axios";

export default {
  data() {
    return {
      photodefault: "https://picsum.photos/200?random=1",
      appName: "Anoringa",
      //posts: [],
      comentariosList: [
        {
          id: 20949438,
          username: "lukaneco",
          content: "Hola pa, que haces",
          inResponseTo: [],
          created_at: 12312948123,
        },
        {
          id: 20949439,
          username: "raul12312",
          content: "nada por suerte",
          inResponseTo: [20949438],
          created_at: 12312948123,
        },
        {
          id: 20949440,
          username: "raulx",
          content: "aca tmando unos verdes",
          inResponseTo: [20949438, 20949439],
          created_at: 12312948123,
        },
      ],
      comments: [],
      postexample: [],
      //endpoint: "http://localhost:3000/api/post",
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post",
      endpoint: "http://localhost:3000/api/post/" + this.$route.params.id,
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post/" + this.$route.params.id,

      //https://agile-everglades-15507.herokuapp.com/api/post/5fea65d576140b6b2093cdb7
      examplesource: "https://jsonplaceholder.typicode.com/posts/",

      id: "asdasdasd",
      url: "asdasdasd",
      photo: "https://picsum.photos/200?random=1",
      title: "some title",
      content: "some scrap contenido",
      loaded_correctly: false,
    };
  },

  name: "Post",
  components: {
    //History,
    Header,
  },

  created() {
    this.getPostDetail();
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
      this.post.push(data);
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
    });*/
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
    getPostDetail() {
      axios
        .get(this.endpoint)
        .then((response) => {
          this.post = response.data.data;
          console.log("-----posts data-------");
          console.log(response.data);
          this.loaded_correctly = true;
          this.title = this.post.title;
          this.content = this.post.description;
          this.photo = this.post.photo;
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
        });
    },
  },
};
</script>



<style lang="css" scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  /*
  text-align: center;
  */
}
.maindiv {
  /*
  margin: 3em auto;
  max-width: 60em;
  margin: auto;
  */
  max-width: 60em;
  margin: auto;

  line-height: 1.5em;
  color: black;
  background-color: gainsboro;

  /*
  background-image: url("https://www.w3schools.com/cssref/paper.gif");
  background-repeat: repeat-y;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  */
}
.container-fluid {
  /*
  background-color: white;
  */
  background-color: lavenderblush;
}

header {
  background-color: #aaa;
  height: 50px;
}
.LeftMenu {
  background-color: #cca;
  width: 100%;
}
.Content {
  width: 100%;
  background-color: #ccf;
}
footer {
  width: 100%;
  background-color: rgb(250, 241, 241);
  height: 100px;
}

.nav {
  list-style: none;
  margin-left: 0;
  margin-bottom: 0;
  padding-left: 0;
}

.nav > li,
.nav > li > a {
  display: inline-block;
  *display: inline;
  zoom: 1;
}

.inline-items {
  margin-top: 0;
}

.inline-items li {
  margin-left: 0;
  border-left: 1px solid black;
  padding-left: 10px;
  padding-right: 10px;
}

.inline-items li:first-child {
  margin-left: 0;
  border: none;
  padding-left: 0;
  padding-right: 10px;
}

.inline-items li:last-child {
  padding-right: 0;
}

/* MEDIA QUERIES */
@media screen and (min-width: 47.5em) {
  /*
  .Middle {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 0;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
  }
  .Content {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 0 0;
    overflow: auto;
  }
  .LeftMenu {
    margin-right: 50%;
    display: block;
  }

  .Content {
    top: 0;
    right: 0;
    width: 50%;
    display: block;
  }
  */
}

/*
@media screen and (min-width: 47.5em) {
  .leftColumn {
    margin-right: 19.5em;
  }

  .rightColumn {
    position: absolute;
    top: 0;
    right: 0;
    width: 18.75em;
  }
} MEDIA QUERIES */
.post-img {
  /*
  position: absolute;
  */
  top: 0;
  left: 0;
  height: 300px;
  width: 300px;
  object-fit: cover;
}

/*

comments


*/

@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap");

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

header,
.repo {
  border: 1px solid #eee;
  padding: 1em;
  border-radius: 3px;
}

header :first-child,
.repo :first-child {
  margin-top: 0;
}

header :last-child,
.repo :last-child {
  margin-bottom: 0;
}

.repo {
  margin-bottom: 1em;
}

.repo h3 {
  margin-bottom: 0;
}

.stats,
.last-updated {
  font-size: 0.7em;
  color: #666;
}

.stats {
  text-transform: uppercase;
  font-weight: bold;
}

.last-updated {
  font-style: italic;
}

header {
  width: 25%;
  float: left;
  text-align: center;
}

header img {
  display: block;
  margin: auto;
  width: 50px;
  height: 50px;
}

section {
  padding-left: 1em;
  float: left;
  /*
  width: 75%;
  */
}
#comentarios {
  text-align: left !important;
}
/*# sourceMappingURL=style.css.map */
</style>