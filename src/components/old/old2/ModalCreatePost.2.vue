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
                      <h3 class="modal-title">Nuevo Post</h3>
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
                      <p></p>

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
                      <!--
                      <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input
                          type="password"
                          class="form-control"
                          id="pwd"
                          placeholder="Enter password"
                          name="pswd"
                        />
                      </div>
                      -->
                      <div class="form-group">
                        <label for="comment">Contenido</label>
                        <textarea
                          v-model="nuevopostcomment"
                          class="form-control"
                          rows="5"
                          id="comment"
                        ></textarea>
                      </div>



                      <input id="inp" type="file" />
                      <p id="b64"></p>
                      <img id="img" height="150" />

                      <div class="form-group form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="remember"
                          />
                          Acepto los terminos y condiciones
                        </label>
                      </div>
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
                        Publicar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      <button @click="showModal = true">Crear Post</button>
    </div>
  </div>
</template>


<script>
import { EventBus } from "../../event-bus";
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

export default {
  //directives: { "b-modal": VBModal },
  name: "ModalLogin",
  components: {
    //BModal,
    //History,
    //Header,
    //Posts,
    //VueModal,
  },
  data() {
    return {
      nuevoposttitulo: "",
      nuevopostcomment: "",
      show: false,
      value:true,
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
    publicar() {
      if (this.nuevoposttitulo != "" && this.nuevopostcomment != "") {
        console.log("titulo");
        console.log(this.nuevoposttitulo);
        console.log("contenido");
        console.log(this.nuevopostcomment);
        this.postCreate(this.nuevoposttitulo, this.nuevopostcomment,this.imagebase64);
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
</style>