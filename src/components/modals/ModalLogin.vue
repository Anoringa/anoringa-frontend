<template>
  <div class="flex flex-wrap">
    <!--
    <button type="button" id="convert-btn" @click="openForm()">Open</button>

    <vodal :show="show" animation="rotate" @hide="show = false">
      <div>A vue modal with animations.</div>
    </vodal>
    -->
    <div>
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title">Crear un nuevo usuario</h3>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true" @click="showModal = false"
                        >&times;</span
                      >
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>rellena el captcha</p>

                    <vue-hcaptcha
                      :sitekey="mySitekey"
                      @verify="onVerify"
                      theme="dark"
                    ></vue-hcaptcha>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="showModal = false"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="publicar"
                    >
                      Crear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <b-button v-b-modal.modal-1 @click="showModal = true" variant="light">
        <img src="/login.png" height="24" style="margin-right: 5px" />
        Loguearse</b-button
      >
    </div>
  </div>
</template>


<script>
import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//import History from "./History";
//import { mapGetters } from "vuex";

import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
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

export default {
  //directives: { "b-modal": VBModal },

  name: "Index",
  components: {
    //BModal,
    //History,
    //Header,
    //Posts,
    //VueModal,
    VueHcaptcha,
  },
  data() {
    return {
      mySitekey: process.env.VUE_APP_HCAPTCHA,
      showModal: false,
      hcaptchaResponse: "",
      jwt: "",
      credenciales: {},
      username: "",
      password: "",
      loading: false,

      nuevoposttitulo: "",
      nuevopostcomment: "",
      show: false,
      modal: {
        title: "Crear un Usuario",
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
      appName: "Anoringa",
      title: "Anoringa",
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
    };
  },
  methods: {
    emit: function () {
      this.$emit("event_child", this.hcaptchaResponse);
    },
    created() {
      this.size = this.visible ? "normal" : "invisible";
    },
    execute() {
      //((this.$refs.captcha as unknown) as HCaptchaMethods).execute();
    },
    onVerify(response) {
      console.log(response);
      this.hcaptchaResponse = response;
      this.$emit("event_child", this.hcaptchaResponse);
      this.showModal = false;
      //emit()
      //createUser(this.hcaptchaResponse)

      /*
    axios
      .post("http://mediawiki.test:7070/api/auth", { token : this.hcaptchaResponse})
      .then((response) => console.log(response))
      .catch(function(error) {
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
    publicar() {
      if (this.nuevoposttitulo != "" && this.nuevopostcomment != "") {
        console.log("titulo");
        console.log(this.nuevoposttitulo);
        console.log("contenido");
        console.log(this.nuevopostcomment);
        this.postCreate(
          this.nuevoposttitulo,
          this.nuevopostcomment,
          this.imagebase64
        );
        console.log("funciono kpo 😎");
        this.showModal = false;
        this.nuevoposttitulo = "";
        this.nuevopostcomment = "";
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
      axios
        .post("http://127.0.0.1:8080/api/posts", {
          username: localStorage.username,
          password: localStorage.password,
          title: titulox,
          photo: photox,
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
  mounted() {},
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

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
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
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
</style>