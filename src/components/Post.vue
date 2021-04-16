<template>
  <main class="maindiv">
    <div v-if="loaded_correctly === 'OK'">
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
                :src="photo ? photo : photodefault"
                class="img-fluid post-img"
                alt="aca iria una foto pero nose donde esta"
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
              {{ pagetitle }}
            </h2>

            <pre
              class="pb-5"
              style="
                text-align: left;
                word-wrap: break-word;
                white-space: pre-wrap;
              "
            ><p v-html="content"></p></pre>

            <div class="stats">
              <a class="pr-1" :href="'/post/' + id">@{{ id }}</a
              >por {{ userowner.username }}
            </div>

            <p class="last-updated">
              Publicado
              {{
                moment(new Date(postcreatedAt)).format(
                  "DD/MM/YYYY [&nbsp;] HH:mm"
                )
              }}.
            </p>
            <!--
            <p class="last-updated">Publicado {{ postcreatedAt | moment }}.</p>
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
                  <div class="form-group pl-3 pt-3">
                    <!--
                    <label class="typo__label">Responder a...</label>
                    -->
                    <multiselect
                      v-model="value"
                      :options="comments"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      selectLabel="Presiona para seleccionar"
                      deselectLabel="Presiona para deseleccionar"
                      placeholder="Responder a..."
                      label="_id"
                      track-by="_id"
                      :preselect-first="false"
                      @input="onChange"
                      no-result="Oops! No list items."
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, search, isOpen }"
                      >
                        <span
                          class="multiselect__single"
                          v-if="values.length &amp;&amp; !isOpen"
                        >
                          <div v-if="values.length > 1">
                            respondiendo a {{ values.length }} comentarios
                          </div>
                          <div v-else>
                            respondiendo a {{ values.length }} comentario
                          </div>
                        </span>
                      </template>
                    </multiselect>
                    <!--
                    <p>{{ value }}</p>
                    <pre class="language-json"><code>{{ value  }}</code></pre>
                    -->
                  </div>
                  <!--
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      id="nuevoComentario"
                      placeholder="En respuesta de..."
                      name="email"
                    />
                  </div>
                  -->
                  <!--
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      name="pswd"
                    />
                  </div>-->
                </div>
              </form>
              <div class="form-group pt-3">
                <!--
                <label for="comment">el comentario:</label>
                -->
                <textarea
                  v-model="nuevoComemtarioTexto"
                  class="form-control"
                  placeholder="Comentario..."
                  rows="2"
                  id="comment"
                ></textarea>

                <b-button class="m-3" v-b-modal.modal-1 @click="crearComentario"
                  >Enviar Comentario</b-button
                >

                <div id="comentarios" class="pt-3"></div>
                <div v-if="comments !== null">
                  <div
                    class="repo container"
                    style="text-align: left"
                    v-for="currentComent in orderBy(comments, 'updatedAt', -1)"
                    :id="currentComent._id"
                    :key="currentComent._id"
                  >
                    <div
                      class="stats"
                      style="word-wrap: break-word; white-space: pre-wrap"
                    >
                      <a class="pr-1" :href="'#' + currentComent._id"
                        >@{{ abreviate(currentComent._id) }}</a
                      ><!--
                      <a
                        v-bind:style="[compare(currentComent.user[0].username,userowner.username) ? 'color: red;': 'color: white;',]"
                        >por {{ currentComent.user[0].username }}</a
                      >-->
                      por
                      <div
                        style="display: inline"
                        :class="
                          compare(
                            currentComent.user[0].username,
                            userowner.username
                          )
                            ? 'comment_in_response'
                            : 'comment'
                        "
                      >
                        {{ currentComent.user[0].username }}
                      </div>
                      <!--
                      <div
                        v-bind:style="[currentComent.user[0].username == userowner.username ? 'color: red;': 'color: white;','color: white;']"
                        >por {{ currentComent.user[0].username }}</div
                      >-->
                      <a
                        v-if="
                          currentComent.user[0].username == userowner.username
                        "
                        >👃</a
                      >
                      <!-- 
                      <a v-text="currentComent.inResponseTo"></a>
                      
                        -->
                      <a v-if="currentComent.inResponseTo.length">
                        en respuesta de
                        <a
                          class="pl-1 pr-1"
                          style="text-align: left; color: orange"
                          v-for="currentComentchild in currentComent.inResponseTo"
                          :id="
                            'popover-target-' +
                            currentComent._id +
                            '-' +
                            currentComentchild
                          "
                          :key="currentComentchild"
                          :href="'#' + currentComentchild"
                          >@{{ abreviate(currentComentchild) }}

                          <b-popover
                            :target="
                              'popover-target-' +
                              currentComent._id +
                              '-' +
                              currentComentchild
                            "
                            triggers="hover"
                            placement="top"
                            :set="
                              (item = getValueOfArray(
                                comments,
                                currentComentchild
                              ))
                            "
                          >
                            <template #title
                              >🏷️ {{ currentComentchild }}</template
                            >
                            <div v-if="item.text">
                              {{ item.text }}
                            </div>
                            <div v-else>El Comentario no existe</div>
                          </b-popover>
                        </a>
                      </a>
                    </div>
                    <p
                      class=""
                      style="word-wrap: break-word; white-space: pre-wrap"
                    >
                      {{ currentComent.text }}
                    </p>
                    <b-button
                      pill
                      variant="link topright"
                      :id="'popover-target-' + currentComent._id"
                      @click="replyThisComment(currentComent)"
                    >
                      <i class="fa fa-reply" style="font-size: 12px"></i>
                      <!-- 
                        <i style="font-size:24px" class="fa">&#xf112;</i>
                        -->
                    </b-button>

                    <b-popover
                      :target="'popover-target-' + currentComent._id"
                      triggers="hover"
                      placement="top"
                    >
                      <template #title>Responder este comentario!</template>
                      Haz click aqui para responder este comentario de
                      <b>{{ currentComent.user[0].username }}</b
                      >!
                    </b-popover>

                    <p class="last-updated" style="color: red">
                      Publicado {{ currentComent.createdAt | moment }}.
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
        <Footer></Footer>
      </div>
    </div>
    <div v-else-if="loaded_correctly == false" style="height: 100%">
      Cargando
      <b-spinner variant="danger" key="danger"></b-spinner>
    </div>
    <div v-else-if="loaded_correctly == 'ERROR'" style="height: 100%">
      ERROR
      <p>no se encontro el post que estas buscando</p>
      <loadingspinner></loadingspinner>
    </div>
  </main>
</template>




<script>
// https://stackoverflow.com/questions/1988349/array-push-if-does-not-exist
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function (comparer) {
  for (var i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }
  return false;
};
// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};
/*
var array = [{ name: "tom", text: "tasty" }];
var element = { name: "tom", text: "tasty" };
array.pushIfNotExist(element, function(e) { 
    return e.name === element.name && e.text === element.text; 
});
*/
//import History from "./History";
//import { mapGetters } from "vuex";
import $ from "jquery";
import Multiselect from "vue-multiselect";
import { EventBus } from "../event-bus";
//Vue.component('multiselect', Multiselect)
import Header from "./Header";
import Footer from "./Footer";
import loadingspinner from "./loadingspinner";
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
//console.log(txt2);
typeof txt2;
/*
      var txt1 = "<p>Text.</p>";        // Create text with HTML
      var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
      var txt3 = document.createElement("p");
      txt3.innerHTML = "Text.";         // Create text with DOM
      console.log(txt1, txt2, txt3);
      $(".container-fluid").append(txt1, txt2, txt3);   // Append new elements
      $("body").append("<p>Text.</p>")
      */
import moment from "moment";
moment.locale("es");
import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
import Vue2Filters from "vue2-filters";
export default {
  created() {
    this.moment = moment;
    this.getPostDetail();
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  } /*
    metaInfo: {
      title: 'My Example App',
      titleTemplate: '%s - Yay!',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
    title: ({ $t }) => $t(this.pagetitle),*/,
  mixins: [Vue2Filters.mixin],
  filters: {
    moment: function (date) {
      //return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      return moment(date).fromNow();
    },
  },
  data() {
    return {
      id: "",
      nuevoComemtarioTexto: "",
      nuevoComemtarioEnRespuestaDe: [],
      ListaDeIdsDeComentarios: [],
      value: [],
      options: [
        { name: "Vue.js", language: "JavaScript" },
        { name: "Adonis", language: "JavaScript" },
        { name: "Rails", language: "Ruby" },
        { name: "Sinatra", language: "Ruby" },
        { name: "Laravel", language: "PHP" },
        { name: "Phoenix", language: "Elixir" },
      ],
      photodefault: "https://picsum.photos/200?random=1",
      appName: "Anoringa",
      userowner: null,
      comentarios: [],
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
      postexample: [],
      //endpoint: "http://localhost:3000/api/post",
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post",
      //endpoint: "http://localhost:3000/api/post/" + this.$route.params.id,
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post/" + this.$route.params.id,
      endpoint: process.env.VUE_APP_API + "/api/post/" + this.$route.params.id,
      //https://agile-everglades-15507.herokuapp.com/api/post/5fea65d576140b6b2093cdb7
      examplesource: "https://jsonplaceholder.typicode.com/posts/",
      url: "asdasdasd",
      photo: "https://picsum.photos/200?random=1",
      pagetitle: "some title",
      comments: [],
      content: "some scrap contenido",
      loaded_correctly: false,
      postcreatedAt: "",
    };
  } /*
metaInfo() {
        return {
            title: `${this.pagetitle} - Anoringa`,
            meta: [
                { name: 'description', content: 'Mira ' + this.pagetitle + ' en Anoringa'},
                { property: 'og:title', content: this.pagetitle + ' - Anoringa'},
                { property: 'og:site_name', content: "Anoringa" },
                { property: 'og:description', content: this.content.substring(0, 30)+"..."},
                {property: 'og:type', content: 'article'},
                {property: 'og:url', content: 'https://anoringa.netlify.app/post/' + this.id},
                {property: 'og:image', content: 'https://anoringa.netlify.app/'+"/anoringa.png" }    
            ]
        }
    },*/,
  name: "Post",
  components: {
    //History,
    Multiselect,
    Header,
    Footer,
    loadingspinner,
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    comment: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      );
      console.log("New Comentario arrived");
      //  :key="item._id""item._id" "url" "photo" title description
      //this.item = ['<call-dialog-link :id="id" :url="url" :photo="photo" :title="new message socket" message="Are you sure you wish to remove this record?" content="Are you sure you wish to remove this record?" label="Remove" css-classes="alert" ></call-dialog-link>'];
      data.createdAt = moment().toISOString();
      data.updatedAt = moment().toISOString();
      this.comments.push(data);
    },
    /*
     */
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
    getValueOfArray(thearray, thevalue) {
      //console.log("thearray");
      //console.log(thearray);
      //console.log("thevalue");
      //console.log(thevalue);

      //var result = null;

      var valObj = thearray.filter(function (elem) {
        if (elem._id == String(thevalue)) {
          //console.log("elem");
          //console.log(elem);
          return elem;
        }
      });

      //if (valObj.length > 0) console.log(valObj[0]);

      if (valObj.length) {
        //console.log("valObj[0]");
        //console.log(valObj[0]);
        return valObj[0];
      } else {
        //console.log("nope 💔");
        return { _id: null, text: null, createdAt: null };
        // no prop
      }
    },
    abreviate(content) {
      //https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
      //var newString = content.replace(/[a-z]{3}\/[a-z]{3}/gi, " ");
      //var stringArray = content.split('')
      var newString = content.substring(0, 3) + "..." + content.slice(-5);
      //console.log(newString);
      return newString;
    },
    compare(a, b) {
      var result = a == b;
      //console.log("compare");
      //console.log(result);
      return result;
    },
    replyThisComment(comentario) {
      //console.log("comentario");
      //console.log(comentario);
      this.value.pushIfNotExist(comentario, function (e) {
        return e._id === comentario._id && e.text === comentario.text;
      });
    },
    isTheOwner(someone) {
      if (someone == this.userowner.username) {
        console.log("is the owner");
        return true;
      } else {
        console.log("is a simple mortal");
        return false;
      }
    },
    onChange(value) {
      this.value = value;
      console.log("comentarios a los que va a responder");
      console.log(value);
      this.ListaDeIdsDeComentarios = value.map(({ _id }) => _id);
      console.log(this.ListaDeIdsDeComentarios);
    },
    crearComentario() {
      if (
        localStorage.username != "" &&
        localStorage.username != undefined &&
        localStorage.username != null &&
        localStorage.password != "" &&
        localStorage.password != undefined &&
        localStorage.password != null
      ) {
        if (
          this.nuevoComemtarioTexto != "" &&
          this.nuevoComemtarioTexto != null
        ) {
          console.log("this.nuevoComemtarioTexto if true");
          console.log(this.nuevoComemtarioTexto);
          console.log("Comemtario Create");
          var data = {
            username: localStorage.username,
            //password: "req.body.password",
            password: localStorage.password,
            text: this.nuevoComemtarioTexto,
            inResponseTo: this.ListaDeIdsDeComentarios,
            postid: this.$route.params.id,
          };
          this.value = [];
          this.ListaDeIdsDeComentarios = [];
          this.nuevoComemtarioTexto = "";
          var self = this;
          this.$socket.emit("comment", data, function (datos) {
            console.log("socket.io emit");
            console.log(datos);
            datos.createdAt = moment().toISOString();
            datos.updatedAt = moment().toISOString();
            datos.user = [
              { username: localStorage.username, _id: "not loaded" },
            ];
            self.comments.push(datos);
            //this.$root.$emit("component1"); //like this
            //this.$root.$emit("component1", "datos", datos);
            //this.$root.$emit("createImage", "datos", datos);
            //EventBus.$emit("createImage", "datos", datos);
            //window.Evento.$emit("createImage", "datos", datos);
            //this.posts.push(datos);
          });
        } else {
          console.log("this.nuevoComemtarioTexto if false");
          console.log(this.nuevoComemtarioTexto);
        }
      } else {
        console.log("logueate hijo de puta");
        alert("logueate hijo de puta");
      }
    },
    postCreate(titulox, contenidox, photox) {
      /*
      {
        "username":"Afoxipeb",
        "password":"JJAsjChPvmwvc2qOcRpMoJnogtv9jcQe",
        "title":"Como ser como one punch man",
        "photo":"somepick",
        "content":"hola mundo este es mi nuevo blog"
      }
      */
      console.log("postCreate");
      var data = {
        title: titulox,
        description: contenidox,
        username: localStorage.username,
        //password: "req.body.password",
        password: localStorage.password,
        photo: photox,
      };
      this.$socket.emit("post", data, function (datos) {
        console.log("socket.io emit");
        console.log(datos);
        //this.$root.$emit("component1"); //like this
        //this.$root.$emit("component1", "datos", datos);
        //this.$root.$emit("createImage", "datos", datos);
        EventBus.$emit("createImage", "datos", datos);
        //window.Evento.$emit("createImage", "datos", datos);
        //this.posts.push(datos);
      });
      /*
      WORKS
      import axios from "axios";
      var qs = require("qs");
      var data = qs.stringify({
        title: titulox,
        description: contenidox,
        photo: "3214htrff4",
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/api/post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3ODgzNjM0NGMwMDRkM2NlNWExNDgiLCJ1c2VybmFtZSI6InJhdWw0NjIyIiwicGFzc3dvcmQiOiIkMmIkMTAkdXdYbFMvd2o3QXRVbmVVMnZVb3FoZWpZUW1rZWl3TnFRazBiMGR0UDF4VDJvMWFmTEFPR1ciLCJpYXQiOjE2MDkxMzU3NDksImV4cCI6MTYwOTE0Mjk0OX0.iAC3NVGRnu3xz6qpZxh6Hpx7AReSAkY33_s424Hw5VE",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .then((response) => console.log(response))
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
        */
      /*
      var config = {
        method: "post",
        url: "http://localhost:3000/api/post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3ODgzNjM0NGMwMDRkM2NlNWExNDgiLCJ1c2VybmFtZSI6InJhdWw0NjIyIiwicGFzc3dvcmQiOiIkMmIkMTAkdXdYbFMvd2o3QXRVbmVVMnZVb3FoZWpZUW1rZWl3TnFRazBiMGR0UDF4VDJvMWFmTEFPR1ciLCJpYXQiOjE2MDkxMzU3NDksImV4cCI6MTYwOTE0Mjk0OX0.iAC3NVGRnu3xz6qpZxh6Hpx7AReSAkY33_s424Hw5VE",
        },
        data: {
          username: localStorage.username,
          password: localStorage.password,
          title: titulox,
          photo: "somephoto",
          description: contenidox,
        },
      };
      */
      /*
      axios
        .request({
          method: config.method,
          url: config.url,
          data: config.data,
          headers: config.headers,
        })
        .then((response) => console.log(response))
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
        */
      /*
      axios
        .post("http://127.0.0.1:8080/api/posts", {
          username: localStorage.username,
          password: localStorage.password,
          title: titulox,
          photo: "somephoto",
          content: contenidox,
        })
        .then((response) => console.log(response))
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
        */
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
    getPostDetail() {
      axios
        .get(this.endpoint)
        .then((response) => {
          this.post = response.data.data;
          console.log("-----posts data-------");
          //console.log(response.data.data);
          //console.log("-----other posts data-------");
          console.log(response.data);
          this.loaded_correctly = "OK";
          this.pagetitle = this.post.title;
          this.content = this.post.description;
          if (this.post.comments.le) {
            this.comments = this.post.comments;
          } else {
            this.comments = this.post.comentarios;
          }

          // Photo object vs media
          if (typeof this.post.photo === "object") {
            console.log("the image coms from object");
            this.photo = this.post.photo.content;
          } else if (
            typeof this.post.photo === "string" ||
            this.post.photo instanceof String
          ) {
            console.log("the image coms from string");
            this.photo = this.post.photo;
          } else {
            console.log("anyone know the image coms from ");
            console.log(typeof this.post.photo);
            console.log(this.post.photo);
            this.photo = this.post.photo;
          }
          this.userowner = this.post.user[0];
          this.id = this.post._id;
          this.postcreatedAt = this.post.createdAt;
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


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style src="./Post.css"></style>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
.container {
  position: relative;
}
.topright {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 14px;
}
</style>
<style lang="css" scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
* {
  /*
  margin: 0;
  padding: 0;
  */
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
  /*height: 300px;
  width: 300px;*/
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
<style lang="css" scoped>
.text-stroke {
  /*
  font-size: 70px;
  */
  color: white;
  margin: 0px;
  padding: 0px;
  font-weight: 200;
  font-style: italic;
  text-shadow: 2px 0px 2px #ec008c, -2px 0px 2px #ec008c, 0px 2px 2px #ec008c,
    0px -2px 2px #ec008c, 0 6px 10px rgba(0, 0, 0, 0.3);
}
</style>