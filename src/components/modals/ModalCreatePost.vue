<template>
  <div class="flex flex-wrap">
    <!-- 
    <button type="button" id="convert-btn" @click="openForm()">Open</button>

    <vodal :show="show" animation="rotate" @hide="show = false">
      <div>A vue modal with animations.</div>
    </vodal>

      -->

    <b-modal
      size="lg"
      v-model="showModal"
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
          <label for="nuevo-post-titulo">Titulo:</label>
          <b-form-input
            id="nuevo-post-titulo"
            v-model="nuevoposttitulo"
            :state="postTitleStatus"
            aria-describedby="nuevo-post-titulo-live-help nuevo-post-titulo-live-feedback"
            placeholder="Ingresa un nombre atractivo"
            debounce="5"
            required
            trim
          ></b-form-input>

          <b-form-invalid-feedback id="nuevo-post-titulo-live-feedback">
            <div v-if="!this.titleIsAlreadyInUse">
              No te lo olvides en blanco 😘<br />Ingresa un nuevo titulo para
              poder postear
            </div>
            <div v-if="this.titleIsAlreadyInUse">
              El titulo que elejiste ya lo esta usando otro post<br />no te
              preocupes, deseguro se te ocurre uno mejor<br />Ingresa un nuevo
              titulo para poder postear
            </div>
          </b-form-invalid-feedback>

          <b-form-valid-feedback id="nuevo-post-titulo-live-feedback" @>
            <p v-if="false">
              frase del dia: como diria mi abuelo, con los militares estabamos
              mejor
            </p>
          </b-form-valid-feedback>

          <!--
          <label for="nuevo-post-titulo">Titulo</label>
          <input
            v-model="nuevoposttitulo"
            type="text"
            class="form-control"
            id="nuevo-post-titulo"
            placeholder="Ingresa un nombre atractivo"
            name="nuevo-post-titulo"
          />
          -->
        </div>
        <div class="form-group">
          <label for="comment">Contenido</label>
          <HtmlEditor />

          <b-form-valid-feedback :state="postContentState"
            >a rodar</b-form-valid-feedback
          >
          <b-form-invalid-feedback :state="postContentState">
            Animate a escribir algo 🥸<br />podes postear lo que
            <strong id="pepegrillo">quieras*</strong> recorda que nadie sabe
            quien sos jijio

            <b-popover :target="'pepegrillo'" triggers="hover" placement="top">
              <template #title>Tene en cuenta</template>

              <small
                >lo que Quieras* siguiendo las normas comunitarias, terminos y
                condiciones</small
              >
            </b-popover>
          </b-form-invalid-feedback>

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

        <div role="group" class="pt-4">
          <label for="postMusic">Musica del post</label>
          <b-form-checkbox
            v-model="postMusicChecked"
            name="check-button"
            switch
          >
            <a v-if="postMusicChecked == true">⏯🎹🎧🎶</a>
            <a v-else>estas a un paso de poner la mejor musica para tu post</a>
          </b-form-checkbox>

          <div role="group" v-if="postMusicChecked" class="pt-3">
            <!--
            <label for="input-live">Link:</label>
            -->
            <b-form-input
              id="input-live"
              v-model="youtube_link"
              :state="youtubeState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Ingresa un link de youtube"
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              ingresa un link de youtube valido Ejemplo :
              https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO
            </b-form-invalid-feedback>
            <!--
            <b-form-text id="input-live-help"
              >ingresa un link de youtube valido</b-form-text
            >-->
            <b-form-valid-feedback id="input-live-feedback">
              <!--
              //https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
-->
              <b-img
                v-if="youtube_video_id != false"
                thumbnail
                fluid
                :src="
                  'https://img.youtube.com/vi/' +
                  youtube_video_id +
                  '/sddefault.jpg'
                "
                alt="Youtube Image thumbnail"
              ></b-img>
            </b-form-valid-feedback>
          </div>
        </div>

        <div role="group" class="pt-4">
          <b-form-checkbox
            :state="postTermsAndConditionsState"
            name="termsAndConditions"
            v-model="postTermsAndConditions"
            >Acepto los terminos y condiciones</b-form-checkbox
          >

          <b-form-invalid-feedback :state="postTermsAndConditionsState"
            >No te lo olvides de aceptar los terminos y condiciones para poder
            postear en anoringa,<br />aceptalos para
            continuar</b-form-invalid-feedback
          >
          <b-form-valid-feedback :state="postTermsAndConditionsState"
            >Listo el pollo</b-form-valid-feedback
          >
        </div>
        <!--
        <div class="form-group form-check pt-3">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="checkbox"
              name="termsAndConditions"
              v-model="postTermsAndConditions"
            />
            Acepto los terminos y condiciones
          </label>
        </div>
        -->
      </b-container>

      <template #modal-footer>
        <b>lleve su pato pequines<!--Crazy cat--></b>
        <p class="float-left">🐱‍🐉</p>
        <b-button
          v-if="publishingStatus == 'publicado'"
          size="sm"
          variant="outline-warning"
          :href="goToPostCreatedLink"
          >Ir al post</b-button
        >

        <b-overlay
          v-if="
            publishingStatus == 'publicandose' ||
            publishingStatus == 'nopublicado'
          "
          :show="publishButtonBusy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
          @hidden="onHidden"
        >
          <b-button
            ref="pbutton"
            size="sm"
            :disabled="publishButtonBusy"
            variant="success"
            @click="publicar"
          >
            Publicar
          </b-button>
        </b-overlay>

        <!--
          <b-button v-if="publishingStatus == ''" size="sm" variant="success" @click="publicar">
            Publicar
          </b-button>
        -->

        <!--
        <b-button size="sm" variant="danger" @click="showPostModal = false">
          Cerrar
        </b-button>
        -->
        <b-button size="sm" variant="danger" @click="showModal = false">
          Cerrar
        </b-button>
      </template>
    </b-modal>
    <div>
      <div class="clickable" @click="showModal = true">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
import { EventBus } from "../../event-bus";
import HtmlEditor from "../html-editor";
//import History from "./History";
//import { mapGetters } from "vuex";

//import Vue from "vue";
//import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// This imports <b-modal> as well as the v-b-modal directive as a plugin:
//import { ModalPlugin } from "bootstrap-vue";
//Vue.use(ModalPlugin);

// Install BootstrapVue
//Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin);

//import { BModal, VBModal } from "bootstrap-vue";
//import VEasyDialog from "v-easy-dialog";

import ImageUploader from "../ImageUploader";

import store from "../../store";

export default {
  computed: {
    postContentState() {
      var postContent = this.postContentTextValue;
      console.log(postContent);
      if (
        postContent != null &&
        postContent != "<p><br></p>" &&
        postContent != "" &&
        postContent.length >= 1
      ) {
        return true;
      } else if (postContent == "" && !this.usertriedtopublicate) {
        return null;
      } else {
        return false;
      }
    },

    postTermsAndConditionsState() {
      if (this.postTermsAndConditions == true) {
        return true;
      } else if (
        this.postTermsAndConditions == null &&
        !this.usertriedtopublicate
      ) {
        return null;
      } else {
        return false;
      }
    },
    usertriedtopublicate() {
      return this.$store.state.postUsertriedtopublicate;
    },
    youtubeState() {
      var url = this.youtube_link;
      console.log(url);
      var videoId = "";
      var urlParts = null;

      if (url.indexOf("youtube") !== -1) {
        urlParts = url.split("?v=");
        videoId = urlParts[1].substring(0, 11);
      } else if (url.indexOf("youtu.be") !== -1) {
        urlParts = url.replace("//", "").split("/");
        videoId = urlParts[1].substring(0, 11);
      }
      if (videoId === "") {
        console.log("Could not extract video id. Seems invalid url");
        //this.youtube_video_id = false;
        //this.youtube_thumbnail = false;
        this.setYoutubeVideoID(false, true);
        return false;
      } else {
        console.log("Video Id is: " + videoId);

        this.setYoutubeVideoID(videoId, true);

        //this.youtube_video_id = videoId;
        //this.youtube_thumbnail = true;
        return true;
      }

      //return this.name.length > 2 ? true : false;
    },
    usernameValue() {
      return localStorage.username;
    },

    postTitleStatus() {
      if (
        this.nuevoposttitulo != null &&
        this.nuevoposttitulo.length >= 1 &&
        !this.titleIsAlreadyInUse
      ) {
        return true;
      } else if (this.nuevoposttitulo == null && !this.usertriedtopublicate) {
        return null;
      } else {
        return false;
      }
    },
    globalPhotoStatus() {
      if (
        this.postPhotoStatus == null &&
        this.postPhotoStatusFrom == null &&
        !this.usertriedtopublicate
      ) {
        return null;
      } else if (
        this.postPhotoStatus == null &&
        this.postPhotoStatusFrom == null &&
        this.usertriedtopublicate == true
      ) {
        return false;
      } else {
        return null;
      }
    },

    postPhotoValue() {
      return this.$store.state.postImage;
    },
    postPhotoStatus() {
      return this.$store.state.PostImageStatus.photoStatus;
    },
    postPhotoStatusFrom() {
      return this.$store.state.PostImageStatus.from;
    },

    postContentTextValue() {
      return this.$store.state.postContentText;
    },
    postPhotoLinkValue() {
      return this.$store.state.postPhotoLink;
    },
  },
  //directives: { "b-modal": VBModal },
  name: "ModalCreatePost",
  components: {
    HtmlEditor,
    ImageUploader,
    //BModal,
    //History,
    //Header,
    //Posts,
    //VueModal,
  },
  data() {
    return {
      goToPostCreatedLink: null,
      publishButtonBusy: false,
      publishingStatus: "nopublicado",
      postTermsAndConditions: null,
      youtube_video_id: false,
      youtube_thumbnail: false,
      youtube_link: "",

      imagebase64: "",

      nuevoposttitulo: null,

      titleIsAlreadyInUse: false,
      //usertriedtopublicate: false,
      //nuevopostcomment: "",
      nuevopostcomment: HtmlEditor.fetchData(),
      show: false,
      value: true,
      postMusicChecked: false,
      modal: {
        title: "Nuevo Post",
        items: [
          {
            label: "Titulo",
            name: "titulo",
            type: "text",
            attr: {
              required: true,
            },
          },
          {
            label: "Contenido",
            name: "contenido",
            type: "textarea",
            attr: {
              readOnly: false,
            },
          },
          /*
          {
            label: "Select Box",
            name: "bio",
            type: "select",
            value: "t1",
            options: [
              { text: "1", value: "one" },
              { text: "2", value: "two" },
            ],
          },*/
          {
            name: "file[]",
            type: "file",
            label: "Foto",
            attr: {
              required: false,
              multiple: false,
            },
          },
        ],
      },
      overflowDialog: true,
      simpleDialog: false,
      enableClose: false,
      showModal: false,
      appName: "Anoringa",
      title: "Anoringa",
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
      loading: false,

      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    /*
    post: function (data) {
      //console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data);

      //  :key="item._id""item._id" "url" "photo" title description

      //this.item = ['<call-dialog-link :id="id" :url="url" :photo="photo" :title="new message socket" message="Are you sure you wish to remove this record?" content="Are you sure you wish to remove this record?" label="Remove" css-classes="alert" ></call-dialog-link>'];
      //this.posts.push(data);
    },
    */
  },
  mounted() {
    /*this.$socket.subscribe("post", function (data) {
      console.log("This event was fired by eg. sio.emit('post')", data);
    });
    */
  },
  watch: {
    /*
    hcaptchatoken(newName) {
      localStorage.hcaptchatoken = newName;
    },*/
  },
  methods: {
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.pbutton.focus();
    },
    setYoutubeVideoID(uno, dos) {
      this.youtube_video_id = uno;
      this.youtube_thumbnail = dos;
    },
    async publicar() {
      console.log("publicar");
      if (
        localStorage.username != "" &&
        localStorage.username != undefined &&
        localStorage.username != null &&
        localStorage.password != "" &&
        localStorage.password != undefined &&
        localStorage.password != null
      ) {
        if (
          this.postTitleStatus == true &&
          this.postContentState == true &&
          this.postPhotoStatus == true &&
          this.postTermsAndConditionsState == true
        ) {
          console.log("postPhotoValue");
          console.log(this.postPhotoValue);

          console.log("postPhotoStatus");
          console.log(this.postPhotoStatus);

          this.isnotcargando = false;

          if (this.isnotcargando == false) {
            console.log("<-----titulo----->");
            console.log(this.nuevoposttitulo);
            console.log("<-----contenido----->");
            console.log(this.postContentTextValue);
            console.log("<-----photo----->");
            console.log(this.postPhotoValue);
            console.log("<-----music----->");
            console.log(this.youtube_video_id);

            this.postCreate(
              this.nuevoposttitulo,
              this.postContentTextValue,
              //this.imageuploadedurl,
              this.postPhotoValue,
              this.youtube_video_id
            );
            /*
             */
            console.log("funciono kpo 😎");
            this.showPostModal = false;

            this.nuevoposttitulo = null;
            store.clearPostContentText;
            //alert("redirecting to the post")

            //console.log("redirecting to the post")
            //console.log("postdata");
            //console.log(postdata);

            //window.location.href="./post/"+postdata._id;
          } else {
            console.log("no funciono kpo, sigue cargando algo");
          }
        } else {
          console.log("no funciono kpo");
          alert("revisa todos los campos gil");
          console.log("postPhotoStatus");
          console.log(this.postPhotoStatus);
          console.log(this.postPhotoStatusFrom);
          //this.usertriedtopublicate = true;
          store.commit({
            type: "setPostUsertriedtopublicate",
            data: true,
          });
          console.log(this.usertriedtopublicate);
        }
      } else {
        console.log("logueate hijo de puta");
        alert("logueate hijo de puta");
      }
    },
    postCreate(titulox, contenidox, photox, musix) {
      console.log("----------💥💥----------");
      console.log(titulox, contenidox, photox);
      console.log("----------💥💥----------");
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
        photo: photox,
        music: musix,

        _id: localStorage.userid,
        username: localStorage.username,
        password: localStorage.password,
      };
      this.publishButtonBusy = true;
      //en la siguiente linea se encuentra una posible falla de seguridad si se hace una injeccion de codigo javascript del lado del cliente
      //EventBus.$emit("sendPostP2P", (data));

      /*
      EventBus.$emit("sendPostP2P", (data), function (datos) {
        console.log("from the publish form : ",datos);
        this.footerBgVariant = "dark";
        this.footerTextVariant = "warning";
        this.publishingStatus = "publicado";
        this.publishButtonBusy = false;
      });
      */

      var self = this;

      this.$socket.emit("post", data, function (datos) {
        console.log("socket.io emit");
        //console.log(datos);
        //console.log("link", datos._id);


        self.goToPostCreatedLink = "/post/" + datos._id;
        //this.$root.$emit("component1"); //like this
        //this.$root.$emit("component1", "datos", datos);
        //this.$root.$emit("sendPostP2P", "datos", datos);

        //en la siguiente linea se encuentra una posible falla de seguridad si se hace una injeccion de codigo javascript del lado del cliente
        EventBus.$emit("sendPostP2P", "datos", datos);

        //window.Evento.$emit("sendPostP2P", "datos", datos);
        //this.posts.push(datos);
        //console.log("redirecting to the post");

        //console.log("from the publish form : ");
        self.footerBgVariant = "dark";
        self.footerTextVariant = "warning";
        self.publishingStatus = "publicado";

        self.publishButtonBusy = false;

        //for the moment i will coment in order to user selenium
        //☮
        //window.location.href = "./post/" + datos._id;
        return datos;
      });
      /*
       */
    },
    toggleBind(attr) {
      this[attr] = !this[attr];
    },
    clickConvert() {},
    convert() {},
    openForm() {
      //this.$refs.modal.open();
      this.show = true;
    },
  },
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

/*
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  color: black;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
*/

.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}

//@import "vodal/common.css";
//@import "vodal/rotate.css";
//@import "./custom.scss";
/*
html{
  margin: 0px;
  padding: 0px;
}
body{
  margin: 0px;
  padding: 0px;
}
body {
  margin: 0;
  color: $dark;
  background: $bright;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
  font-size: 14px;
}

* {
  margin: 0;
  padding: 0;
}
#index {
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 50px;
}
*/

/*

* {
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
}
pre {
  background-color: #e4e4e4;
  padding: 2px;
  display: inline-block;
  box-shadow: 2px 2px 5px -3px #000000;
  border-radius: 3px;
}

.demo-btn {
  color: white;
  background-color: indigo;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: opacity ease-in-out 0.15s;
}

.demo-btn:hover {
  opacity: 0.8;
}

.v-card {
  border-radius: 10px;
  background-color: white;
  //box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000);
}

.v-card > * + * {
  border-top-width: calc(1px * calc(1 - 0));
  border-bottom-width: calc(1px * 0);
}

.v-card > * {
  padding: 1rem;
}


$darker: #222;
$dark: #555;
$bright: #ddd;

#index {
  //width: 80%;
  margin: 0px;
  padding: 0px;
  text-align: center;
}
.v-easy-dialog--backdrop-btn {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    //width: 100%;
    //height: 100%;
    cursor: default;
}
*/
.clickable {
  cursor: pointer;
}
</style>

<style scoped>
/*

RAINBOW BUTTON
SRC: https://codepen.io/lemmin/pen/WObwRX


*/
a {
  text-decoration: none;
  color: #fff;
}
.rainbow-button {
  width: calc(20vw + 6px);
  height: calc(8vw + 6px);
  background-image: linear-gradient(
    90deg,
    #00c0ff 0%,
    #ffcf00 49%,
    #fc4f4f 80%,
    #00c0ff 100%
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 3vw;
  font-weight: bold;
}
.rainbow-button:after {
  content: attr(alt);
  width: 20vw;
  height: 8vw;
  background-color: #191919;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rainbow-button:hover {
  animation: slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}
</style>