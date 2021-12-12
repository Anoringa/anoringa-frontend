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
      :title="modalTitle"
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
          <HtmlEditor></HtmlEditor>

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
import postMixin from "../../mixins/postMixin.js";

import HtmlEditor from "../html-editor.vue";
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

import ImageUploader from "../ImageUploader.vue";
import store from "../../store";

export default {
  name: "ModalLogin",
  mixins: [postMixin],
  props: {
    typeOfOperation: {
      required: true,
    },
    postId: {
      required: true,
    },
  },
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
      modalTitle: null,

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
      formLookAndFeel: {
        edit: { title: "Editar el Post" },
        new: { title: "ost" },
        delete: { title: "Eliminar Post" },
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
    this.checkTypeOfOperation();
    this.getPost(this.postId).then((r) => {
      console.log(r); // prints 60 after 4 seconds.
      var gettedPost = r;
      this.nuevoposttitulo = gettedPost.title;
      this.youtube_link = "https://www.youtube.com/watch?v=" + gettedPost.music;

      this.setImageSource({
        value: {
          type: gettedPost.photo.value,
          source: gettedPost.photo.source,
        },
        content: gettedPost.photo.content,
      });

      /*
      content: "https://ik.imagekit.io/ym5grvwvw2m/b6cf07a3-9f5c-4e12-8979-4df56881ad3d_7bWbEBpgI"
source: "upload"
value: "photo" */
    });
  },
  watch: {
    /*
    hcaptchatoken(newName) {
      localStorage.hcaptchatoken = newName;
    },*/
  },
  methods: {
    setImageSource(data) {
      //console.log("the media of the post has been setted");
      //console.log(data);
      //console.log("💥");

      store.commit({
        type: "setPostImage",
        content: data.content,
        value: { type: data.value.type, source: data.value.source },
      });
    },
    checkTypeOfOperation() {
      if (this.typeOfOperation == "edit") {
        this.modalTitle = this.formLookAndFeel.edit.title;
      } else if (this.typeOfOperation == "new") {
        this.modalTitle = this.formLookAndFeel.new.title;
      } else if (this.typeOfOperation == "delete") {
        this.modalTitle = this.formLookAndFeel.delete.title;
      } else {
        this.modalTitle = "ERROR";
      }
      console.log(this.typeOfOperation);
    },
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.pbutton.focus();
    },
    setYoutubeVideoID(uno, dos) {
      this.youtube_video_id = uno;
      this.youtube_thumbnail = dos;
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