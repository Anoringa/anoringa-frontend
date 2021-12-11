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
                  <div v-if="loginProcessStep == 'create'" class="modal-body">
                    <b-form-group id="input-group-1" label-for="input-1">
                      <label for="email2" class="mb-2 mr-sm-2" inline
                        >Elegir mi nombre de usuario</label
                      >
                      <b-form-input
                        id="input-1"
                        v-model="theName"
                        :state="newUsernameState"
                        type="text"
                        placeholder="Ingresa aca un nuevo nombre"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-valid-feedback :state="newUsernameState">
                      <p>Excelente</p>
                    </b-form-valid-feedback>

                    <b-form-invalid-feedback :state="newUsernameState">
                      <p>
                        Los nombres de usuario pueden tener desde 2 hasta 32
                        caracteres entre letras minusculas, mayusculas, numeros
                        y caracteres especiales como: ¡ ! ¿ ? @ ç Ç . ,
                      </p></b-form-invalid-feedback
                    >
                    <p>Rellena el captcha</p>

                    <vue-hcaptcha
                      :sitekey="mySitekey"
                      @verify="onVerify"
                      theme="dark"
                    ></vue-hcaptcha>
                  </div>
                  <div
                    v-else-if="loginProcessStep == 'modify'"
                    class="modal-body"
                  >
                    <p>Elije un nombre que te guste</p>
                  </div>
                  <div v-else class="modal-body">
                    <p>nose que paso, putea aca a los desarrolladores</p>
                    <a href="/reportar?type=Falla">Reportar Falla</a>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="showModal = false"
                    >
                      Cerrar
                    </button>
                    <!--
                    <button
                      v-if="loginProcessStep === 'create'"
                      type="button"
                      class="btn btn-primary"
                      @click="publicar"
                    >
                      Crear
                    </button>
                    -->
                    <button
                      v-if="loginProcessStep === 'modify'"
                      type="button"
                      class="btn btn-primary"
                      @click="publicar"
                    >
                      Nombrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <b-button v-b-modal.modal-1 @click="showModal = true" variant="light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="login-icon"
          width="22"
        >
          <path
            d="M241.5.5h223L297.5 448c-12.167.167-43.4.4-71 0-34.5-.5-55-44-55-57v-44c10.333-10 33.6-32.6 44-43 58-56 61-67.5 60-96s-13-32.5-60-82.5-44-38.5-44-60c-1.5-52.5 51-65 70-65Z"
            class="icon-back-door"
          />
          <path
            d="M106.5 131v60H19c-6 0-18 4.4-18 22s12 23 18 23.5h87.5v57c0 39 34 25 42.5 15.5s63-62.5 72-72.5 14-17.5 14-23.5c0-4.8-9.333-16.667-14-22-14.667-13.833-49.6-47.3-72-70.5-28-29-42.5 1.5-42.5 10.5Z"
            class="icon-arrow-door"
          />
          <path
            d="M323.5 47.5C307.5 54 299 65.5 299 97v356.5c0 65 48 58.5 57.5 55.5s126-41.5 135-45 20.5-20 20.5-41.5.5-330.5 0-375-43-49-55.5-45.5-117 39-133 45.5Z"
            class="icon-front-door"
          />
        </svg>
        <span class="login-button-text">Iniciar Sesión</span></b-button
      >
    </div>
  </div>
</template>


<script>
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
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
    computed: {
    newUsernameState() {
      var theName = this.theName;
      //console.log(NewName);
      let pattern = /^[¡!¿?@çÇ.,a-zA-Z\d\-_\s]{2,32}$/;
      if (theName != null && theName.match(pattern) && !this.usernameAlreadyInUse) {
        return true;
      } else if (theName == null && !this.usernameAlreadyInUse) {
        return null;
      } else {
        return false;
      }
    },
    },
  data() {
    return {
      usernameAlreadyInUse:false,
      theName:null,
      loginProcessStep: "create",
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
      console.log("event_child 1");
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

      console.log("event_child 2");
      //this.showModal = false;
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

.login-icon {
  display: inline;
  vertical-align: middle;
  margin-right: 7px;

  @include dynamic-theme() {
    fill: theme($primary-color);

    .icon-back-door {
      fill: theme($primary-color);
    }
    .icon-front-door {
      fill: theme($primary-light-color);
    }
    .icon-arrow-door {
      fill: theme($contrast-color);
    }
  }
}
.login-button-text {
  vertical-align: middle;
}
</style>
