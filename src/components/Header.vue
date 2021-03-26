<template>
  <div>
    <!--
    <div>{{ postContentTextValue }}</div>
    -->

    <!--
    <p>{{windowWidth}}</p>
    <p>{{windowHeight}}</p>
    -->
    <!--
    <b-navbar toggleable="lg" type="dark" navbar-expand variant="info">
      <b-navbar-brand href="#">{{ appNamex }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Inicio</b-nav-item>
          <b-nav-item href="#">Top</b-nav-item>
          <b-nav-item href="#">die Regeln</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

      <select
        class="selectpicker ml-auto mr-2"
        data-width="auto"
        data-style="btn-primary"
      ></select>

    </b-navbar>
    -->

    <nav class="navbar navbar-expand-md bg-danger navbar-dark">
      <a class="navbar-brand loguito" href="/" style=""
        ><!--
        <img
        v-if="windowWidth < 442"
          src="/anoringa_logo.png"
          class="d-inline-block align-top"
          height="35"
          alt="A"
        />-->
        <a v-if="windowWidth > 442" class="navbar-brand loguito mr-1" href="/">
          {{ appNamex }}
        </a>
        <img
          v-if="windowWidth < 442"
          href="/"
          src="/anoringa_logo.png"
          class="d-inline-block align-top"
          height="35"
          alt="A"
        />
        <a class="badge badge--beta" href="/"
          >alpha</a
        >
      </a>
      <!--
      <button
        class="navbar-toggler order-last order-md-0"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      -->

      <b-navbar-toggle
        v-if="windowWidth > 380"
        class="navbar-toggler order-last order-md-0"
        target="nav-collapse"
      ></b-navbar-toggle>
      <b-collapse
        class="collapse navbar-collapse order-last order-md-0"
        id="nav-collapse"
        is-nav
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link linker" href="/">Top</a>
          </li>
          <li class="nav-item">
            <a class="nav-link linker" href="/">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link linker" href="/">las reglas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link linker" @click="showPostModal = true">Postear</a>
          </li>
        </ul>
      </b-collapse>

      <!--
      <select
        class="selectpicker ml-auto mr-2"
        data-width="auto"
        data-style="btn-primary"
      >
        <option
          *ngFor="let lang of cirsaApp.translate.getLangs(); let i = index"
          [value]="lang"
          [selected]="lang === cirsaApp.translate.currentLang"
        >
          {{ cirsaApp._countries[i] }}
        </option>
      </select>
        -->
      <!--
          
          <b-nav-text class="pl-1 pr-1">
            <b-dropdown
              id="dropdown-right"
              right
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret

          -->

      <div v-if="loggedstate === false">
        <ModalLogin v-on:event_child="eventChild"></ModalLogin>
      </div>

      <b-dropdown
        v-else-if="loggedstate === true"
        id="dropdown-1"
        right
        variant=""
        class="m-md-2"
      >
        <template #button-content class="d-flex align-items-center">
          <span class="pr-2" style="display: inline-block"
            ><p class="d-none d-sm-block" style="line-height: 0px">
              {{ username }}
            </p></span
          >

          <img
            style="display: inline-block; border-radius: 50%"
            type="button"
            src="/user.png"
            width="30"
            height="30"
            alt="logo"
            class="dropdown-toggle"
            data-toggle="dropdown"
          />
        </template>

        <b-dropdown-item class="d-block d-sm-none" disabled>{{
          username
        }}</b-dropdown-item>

        <b-dropdown-item @click="showPostModal = true"
          >Postear algo</b-dropdown-item
        >
        <b-dropdown-item>Configuracion</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>Soporte</b-dropdown-item>
        <b-dropdown-item>Sugerir cambios</b-dropdown-item>
        <b-dropdown-item @click="cerrarSecion()">Salir</b-dropdown-item>
        <!--
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        -->
      </b-dropdown>
    </nav>
    <!--
    </nav>
    <nav class="navbar navbar-expand bg-danger justify-content-between">
      
      <b-navbar-brand tag="h1" class="p-1">
        <b-button variant="danger" @click="clicked()"
          ><img
            src="/anoringa_logo.png"
            class="d-inline-block align-top"
            height="35"
            alt="Anoringa Logo"
          />
        </b-button>


        <b-link
          href="/"
          style="font-weight: m; text-decoration: none; color: #212529"
          >{{ appNamex }}
        </b-link>
      </b-navbar-brand>

      <b-button variant="danger" @click="clicked()">
        <big>≡</big>Inicio
      </b-button>

      <b-nav-form>
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Buscar"
        ></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">⌕</b-button>
      </b-nav-form>

      <b-button variant="danger" @click="show = true">✣Nuevo Post</b-button>
     
      <div class="flex flex-wrap">
        <div v-if="loggedstate === false">
        
          <ModalLogin v-on:event_child="eventChild"></ModalLogin>
        </div>

        <div v-else-if="loggedstate === true">
          <b-nav-text class="pl-1 pr-1" style="">
            hola {{ username }}
          </b-nav-text>

          <b-nav-text class="pl-1 pr-1">
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
                  src="/user.png"
                  width="30"
                  height="30"
                  alt="logo"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  style="border-radius: 50%"
                />
              </template>
              <b-dropdown-item @click="show = true"
                >Postear algo</b-dropdown-item
              >
              <b-dropdown-item>Configuracion</b-dropdown-item>
              <b-dropdown-item @click="cerrarSecion()">Salir</b-dropdown-item>
            </b-dropdown>
          </b-nav-text>
</div>

        <div v-else>Si no es A, B o C</div>
</div>
    </nav>

    -->

    <b-modal
      v-model="showPostModal"
      title="Nuevo Post"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container fluid>
        <div class="form-group">
          <label for="nuevo-post-titulo">Titulo</label>
          <input
            v-model="nuevoposttitulo"
            type="text"
            class="form-control"
            id="nuevo-post-titulo"
            placeholder="Ingresa un nombre atractivo"
            name="nuevo-post-titulo"
          />
        </div>
        <div class="form-group">
          <label for="comment">Contenido</label>
          <HtmlEditor />

          <!--
          <html-editor @child-checkbox="checkboxValue" />
          <html-editor :htmlContent="nuevopostcomment" />
          <trumbowyg
            v-model="nuevopostcomment"
            :config="config"
            class="form-control"
            name="content"
          ></trumbowyg>-->
          <!--
          <div id="trumbowyg-demo"></div>
          <textarea
            v-model="nuevopostcomment"
            class="form-control"
            rows="5"
            id="comment"
          ></textarea>
          -->
        </div>

        <label for="postImage">Imagen del post</label>
        <ImageUploader></ImageUploader>
        <!--
        <div class="container mt-10" id="postImage">
          <div class="card bg-white">
            <img style="" :src="imagebase64" alt="" width="50%" height="auto" />
            <input
              @change="handleImage"
              class="custom-input"
              type="file"
              accept="image/*"
            />
          </div>
        </div>-->

        <div class="form-group form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="remember" />
            Acepto los terminos y condiciones
          </label>
        </div>
      </b-container>
      <template #modal-footer>
        <b>Crazy cat</b>
        <p class="float-left">🐱‍🐉</p>
        <b-button size="sm" variant="success" @click="publicar">
          Publicar
        </b-button>
        <b-button size="sm" variant="danger" @click="showPostModal = false">
          Cerrar
        </b-button>
      </template>
    </b-modal>
  </div>
</template>


<script>
//import History from "./History";
//import { mapGetters } from "vuex";
//import Login from "./Login";

import { EventBus } from "../event-bus";
import swal from "sweetalert";
//import Captcha from "./Captcha";
import axios from "axios";
//import store from "../store";
//import ModalCreatePost from "./modals/ModalCreatePost";
import ModalLogin from "./modals/ModalLogin";

//import { myVar, Settings } from '../environment.js'
//TextContent

/*
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
*/
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
/*
// We import JQuery
const $ = require('jquery');
// We declare it globally
window.$ = $;
*/
/*
import "trumbowyg";
// Import this component
import Trumbowyg from "vue-trumbowyg";

// Import editor css
import "trumbowyg/dist/ui/trumbowyg.css";
*/

//import HtmlEditor from "./html-editor";
import store from "../store";

// You can use it now

/*
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
// We import JQuery
const $ = require('jquery');
// We declare it globally
window.$ = $;
*/
/*
import "trumbowyg";
// Import this component
import Trumbowyg from "vue-trumbowyg";

// Import editor css
import "trumbowyg/dist/ui/trumbowyg.css";
*/

import HtmlEditor from "./html-editor";

// You can use it now
import ImageUploader from "./ImageUploader";
export default {
  props: {
    appName: {
      required: true,
    },
  },
  name: "Header",
  components: {
    //History,
    //Login
    //ModalCreatePost,
    ModalLogin,
    //Trumbowyg,
    HtmlEditor,
    ImageUploader,
  },
  data() {
    return {
      check: false,
      config: {
        // Get options from
        // https://alex-d.github.io/Trumbowyg/documentation
        tagsToRemove: ["script", "link"],
        removeformatPasted: false,
        imageWidthModalEdit: true,
        urlProtocol: true,

        btns: [
          //["viewHTML"],
          //["undo", "redo"], // Only supported in Blink browsers
          ["formatting"],
          ["strong", "em", "del"],
          ["superscript", "subscript"],
          ["link"],
          ["insertImage"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
          ["unorderedList", "orderedList"],
          ["horizontalRule"],
          ["removeformat"],
          //["fullscreen"],
        ],
      },
      windowHeight: null,
      windowWidth: window.innerWidth,
      appNamex: process.env.VUE_APP_NAME,
      isnotcargando: false,
      imagebase64: "",
      imageuploadedurl: "",
      remoteUrl: "",
      nuevoposttitulo: "",
      nuevopostcomment: HtmlEditor.fetchData(),
      showPostModal: false,
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark",
      ],
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",

      convertClicked: false,
      showModal: false,
      loggedstate: false,
      hcaptchatoken: "",
      jwt: "",
      credenciales: { username: "", password: "" },
      username: "",
      password: "",
      loading: false,
      //loginurl:"http://mediawiki.test:8080/api/users"
      //loginurl: "http://localhost:3000/api/user/register",
      //console.log(process.env)
      //loginurl: "https://agile-everglades-15507.herokuapp.com/api/user/register",
      loginurl: process.env.VUE_APP_API + "/api/user/register",
      //loginurl: "http://localhost:3000/api/user/register",
    };
  },
  mounted() {
    this.increment(); // -> 1
    //this.personal = this.$refs.personal.model;
    //this.education = this.$refs.education.htmlContent;
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    });
    console.log(process.env);

    /*
    if (localStorage.hcaptchatoken) {
      this.hcaptchatoken = localStorage.hcaptchatoken;
    }*/
    /*
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.password) {
      this.password = localStorage.password;
    }*/
    if (localStorage.username && localStorage.password) {
      console.log("user has been logged previusly");
      this.username = localStorage.username;
      this.password = localStorage.password;
      this.loggedstate = true;
    } else {
      console.log("user needs to log in");
      this.loggedstate = false;
      //https://es.vuejs.org/v2/guide/conditional.html
    }
  },
  watch: {
    /*
    hcaptchatoken(newName) {
      localStorage.hcaptchatoken = newName;
    },*/
    username(newName) {
      localStorage.username = newName;
    },
    password(newName) {
      localStorage.password = newName;
    },
  },
  computed: {
    postContentTextValue() {
      return this.$store.state.postContentText;
    },
    postPhotoLinkValue() {
      return this.$store.state.postPhotoLink;
    },
  },
  methods: {
    increment() {
      console.log("incrementing");

      store.commit("increment");
      console.log(store.state.count);
    },
    // Gets the checkbox information from the child component
    checkboxValue: function (params) {
      console.log("html text params");
      console.log(params);
      this.check = params;
      return params;
    },

    handleImage(e) {
      const selectedImage = e.target.files[0]; // get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagebase64 = e.target.result;
        console.log("this.image");
        console.log(this.imagebase64);
        //this.uploadImage();
        //this.image = this.uploadImageImgur(this.imagebase64);
      };
      reader.readAsDataURL(fileObject);
    },
    setImageUploadedUrl(nameurl) {
      this.imageuploadedurl = nameurl;
    },
    async uploadImageImgur(base64code) {
      this.isnotcargando = true;
      console.log("base64code");
      console.log(base64code);
      var res = base64code.split(",");
      console.log(res[1]);

      var data = new FormData();
      data.append("image", res[1]);
      var config = {
        method: "post",
        url: "https://api.imgur.com/3/image",
        headers: {
          Authorization: "Client-ID 3874349859f507b",
        },
        data: data,
      };

      var self = this;
      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data.data.link);
          console.log();
          self.setImageUploadedUrl(response.data.data.link);
          //return response.data.data.link;
        })
        .catch(function (error) {
          self.setImageUploadedUrl(false);
          console.log(error);
        });
      /*
      this.isnotcargando = true;
      console.log("base64code");
      console.log(base64code);

      var res = base64code.split(",");
      console.log(res[1]);

      var data = new FormData();

      data.append("image", res[1]);

      var config = {
        method: "post",
        url: "https://api.imgur.com/3/image",
        headers: {
          Authorization: "Client-ID 3874349859f507b",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data.data.link);
          console.log();
          this.imageuploadedurl = response.data.data.link;
          this.isnotcargando = false;
          //return response.data.data.link;
        })
        .catch(function (error) {
          console.log(error);
          //return "error";
          this.imageuploadedurl = "error";
          this.isnotcargando = false;
        });*/
    },
    uploadImage() {
      const { image } = this;
      axios
        .post("http://127.0.0.1:8081/upload", { image })
        .then((response) => {
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        });
    },
    async publicar() {
      console.log("publicar");
      
      if (this.nuevoposttitulo != "" && this.postContentTextValue != "") {
        this.isnotcargando = false;
        console.log("base64code");
        console.log(this.imagebase64);
        var res = this.imagebase64.split(",");
        console.log(res[1]);

        var data = new FormData();
        data.append("image", res[1]);

        var config = {
          method: "post",
          url: "https://api.imgur.com/3/image",
          headers: {
            Authorization: "Client-ID 3874349859f507b",
          },
          data: data,
        };

        var self = this;
        await axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data.data.link);
            console.log();
            self.setImageUploadedUrl(response.data.data.link);
            //return response.data.data.link;
          })
          .catch(function (error) {
            self.setImageUploadedUrl(false);
            console.log(error);
          });

        if (this.isnotcargando == false) {
          console.log("titulo");
          console.log(this.nuevoposttitulo);
          console.log("contenido");
          console.log(this.postContentTextValue);
          this.postCreate(
            this.nuevoposttitulo,
            this.postContentTextValue,
            this.imageuploadedurl
          );
          console.log("funciono kpo 😎");
          this.showPostModal = false;

          this.nuevoposttitulo = "";
          store.clearPostContentText;
          //alert("redirecting to the post")
          /*
          console.log("redirecting to the post")
          console.log("postdata");
          console.log(postdata);

          window.location.href="./post/"+postdata._id; 
          */
        } else {
          console.log("no funciono kpo, sigue cargando algo");
        }
      } else {
        console.log("no funciono kpo");
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
        console.log("redirecting to the post");

        window.location.href = "./post/" + datos._id;
        return datos;
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
    toggleBind(attr) {
      this[attr] = !this[attr];
    },
    openForm() {
      //this.$refs.modal.open();
      this.showPostModal = true;
    },
    eventChild: function (content_from_child) {
      console.log("Event from child component emitted", content_from_child);
      this.hcaptchatoken = content_from_child;
      this.userCreate(this.hcaptchatoken);
    },
    clickConvert() {},
    convert() {},
    userStore(response) {
      console.log("User Created", response);
      console.log("User Created", response.data);
      var credenciales = response.data.data;
      this.username = credenciales.username;
      this.password = credenciales.password;
      this.credenciales["username"] = credenciales.username;
      this.credenciales["password"] = credenciales.password;
      console.log("credencial", this.credenciales);
      store.commit("SET_PRODUCTS", this.credenciales);
      this.loggedstate = true;
    },
    userCreate(hcaptchatoken) {
      var params = new URLSearchParams();
      params.append("token", hcaptchatoken);
      //axios.post("/foo", params);

      axios
        .post(this.loginurl, params)
        .then((response) => this.userStore(response))
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
    },

    cerrarSecion() {
      this.username = "";
      this.password = "";
      this.loggedstate = false;
    },
    openCreatePostModal() {
      //https://vuejsexamples.com/tag/popup/
      //https://vuejsexamples.com/a-small-wrapper-for-integrating-sweetalert-to-vuejs/
      //https://sweetalert.js.org/guides/#installation

      //https://vuejsexamples.com/simple-lightweight-and-elegant-global-notification-popup-for-vue-js/

      //https://stackoverflow.com/questions/50015336/google-recaptcha-within-sweetalert-modal-window
      /*
      var passwordinput = document.createElement("input");
      slider.type = "text";
      slider.placeholder = "Type your password";
      var slider = document.createElement("input");
      slider.type = "range";

      swal({
        content: slider,
      },{
        content: slider,
      });




            swal({
        title: "Multiple inputs",
        html:
          '<input id="swal-input1" class="swal2-input">' +
          '<input id="swal-input2" class="swal2-input">',
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve([$("#swal-input1").val(), $("#swal-input2").val()]);
          });
        },
        onOpen: function () {
          $("#swal-input1").focus();
        },
      })
        .then(function (result) {
          swal(JSON.stringify(result));
        })
        .catch(swal.noop);
      */
      swal({
        title: "Log In to Continue",
        html: true,
        text:
          "Username: <input type='text'><br>Password: <input type='password'>",
      });

      /*
      swal({
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "text",
          },
        },
      });*/
    },
    clicked() {
      //console.log("clicked");
      //console.log(this.id);
      window.location.href = "/";
    },
    openModal() {
      //https://vuejsexamples.com/tag/popup/
      //https://vuejsexamples.com/a-small-wrapper-for-integrating-sweetalert-to-vuejs/
      //https://sweetalert.js.org/guides/#installation

      //https://vuejsexamples.com/simple-lightweight-and-elegant-global-notification-popup-for-vue-js/

      //https://stackoverflow.com/questions/50015336/google-recaptcha-within-sweetalert-modal-window
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          console.log("LOGGED IN");

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          console.log("NOT LOGGED IN");
          swal("Your imaginary file is safe!");
        }
      });
    },
  },
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

$darker: #222;
$dark: #555;
$bright: #ddd;

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
.linker {
  padding: 0px;
  margin: 0px;
}

@import url("https://fonts.googleapis.com/css?family=Overpass+Mono:300,400,600,700|Overpass:100,100i,200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&subset=latin-ext");

html,
body {
  font-family: "Open Sans", sans-serif;
  /*
  font-family: 'Roboto', sans-serif;
  */
}
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Open+Sans&display=swap");
.loguito {
  /*
  font-family: "Overpass Mono";
  font-weight: 700;
  */
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 28px;
  font-weight: m;
  text-decoration: none;
  color: #212529;
  /*
  */
}
/*
.navbar {
    background-color: #F95453;
    margin-bottom: 20px;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
}
h1.white-header {
    color: #FFFFFF;
    font-size: 2em;
}
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
header {
  margin: 0;
    width: 100%;
    padding: 0.5rem 0;
    background: $darker;
    color: $bright;
    position: fixed;
    z-index: 0;
    > .container {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
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
main {
  padding-top: 5rem;
  padding-bottom: 3rem;
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}
*/

.badge {
  padding: 2px 4px;
  line-height: 1rem;
  font-size: 0.875rem;
  position: relative;
  border-radius: 20px;
  color: #333333;
}

.badge--beta {
  //color:  lighten(hsl(267,64,44), 10%) !important;
  color: hsl(267, 64, 44) !important;
  //border: 2px solid lighten(hsl(267,64,44), 25%);
  border: 1px solid hsl(267, 64, 44);
  font-weight: 600;
  /*
    &:after {
        content: "BETA";
    }*/
}
</style>