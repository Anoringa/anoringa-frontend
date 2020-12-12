<template>
  <div class="flex flex-wrap">
    <div v-if="loggedstate === false">
      <button @click="showModal = true">Postear algo</button>
      <!--
      <button type="button" id="convert-btn" @click="openModal()">Login</button>
      <div>My hcaptcha Token is <input v-model="hcaptchatoken" /></div>
        -->
    </div>

    <div v-else-if="loggedstate === true">
      <div>
        You already logged in
        <p v-text="username" />
      </div>
      <button type="button" id="convert-btn" @click="openCreatePostModal()">
        Create Post
      </button>
      <ModalCreatePost></ModalCreatePost>
    </div>
    <div v-else>Si no es A, B o C</div>

    <!--
        <vue-hcaptcha sitekey="51cf4065-0907-4910-8931-f90223761fb6" @verify="onVerify" theme="dark"></vue-hcaptcha>
      -->

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
                  <Captcha v-on:event_child="eventChild"></Captcha>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showModal = false"
                  >
                    Cerrar
                  </button>
                  <button type="button" class="btn btn-primary">
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <button @click="showModal = true">Postear algo</button>
  </div>
  <!--
  <header id="header">
    <div class="container">
      <h1>{{appName}}</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><p>im a header</p></li>
          <li><button type="button" id="convert-btn" @click="openModal()">Login</button></li>
    
    
        </ul>
      </nav>
    </div>
  </header>
      -->
</template>


<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import swal from "sweetalert";
import Captcha from "./Captcha";
import axios from "axios";
import store from "../store";
import ModalCreatePost from "./modals/ModalCreatePost";

//import VueModal from "@kouts/vue-modal";
//import "@kouts/vue-modal/dist/vue-modal.css";

//import JQuery from 'jquery'
//window.$ = JQuery

//import $ from 'jquery'
/*
function createUser(hcaptchatoken) {
    axios
      .post("http://mediawiki.test:7070/api/users", { token : hcaptchatoken})
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
}
 */

export default {
  props: {},
  name: "Header",
  components: {
    //History,
    Captcha,
    ModalCreatePost,
    //VueModal,
  },
  data() {
    return {
      showModal: false,
      loggedstate: false,
      hcaptchatoken: "",
      jwt: "",
      credenciales: { username: "", password: "" },
      username: "",
      password: "",
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
      loading: false,
    };
  },

  mounted() {
    /*
    if (localStorage.hcaptchatoken) {
      this.hcaptchatoken = localStorage.hcaptchatoken;
    }*/
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.password) {
      this.password = localStorage.password;
    }
    if (localStorage.username && localStorage.password) {
      console.log("user has been logged previusly");
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
  methods: {
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

      this.username = response.data.username;
      this.password = response.data.password;
      this.credenciales["username"] = response.data.username;
      this.credenciales["password"] = response.data.password;
      console.log("credencial", this.credenciales);
      store.commit("SET_PRODUCTS", this.credenciales);
      this.loggedstate = true;
    },
    userCreate(hcaptchatoken) {
      axios
        .post("http://mediawiki.test:8080/api/users", { token: hcaptchatoken })
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
  },
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

$darker: #222;
$dark: #555;
$bright: #ddd;

.navbar {
  background-color: #f95453;
  margin-bottom: 20px;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
}
h1.white-header {
  color: #ffffff;
  font-size: 2em;
}
/**/
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
</style>