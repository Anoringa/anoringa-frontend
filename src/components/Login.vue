<template>
  <div class="flex flex-wrap">
    <div v-if="loggedstate === false">
      <!--

      <button @click="showModal = true">Postear algo</button>


      <button type="button" id="convert-btn" @click="openModal()">Login</button>
      <div>My hcaptcha Token is <input v-model="hcaptchatoken" /></div>
        -->

      <ModalLogin v-on:event_child="eventChild"></ModalLogin>
    </div>

    <div v-else-if="loggedstate === true">
      
      <b-nav-text class="pl-1 pr-1" > hola {{ username }} </b-nav-text>

      <b-nav-text class="pl-1 pr-1" >
        <ModalCreatePost v-on:event_child="eventChild"></ModalCreatePost>
      </b-nav-text>


      <b-nav-text class="pl-1 pr-1" >
        <b-dropdown
          id="dropdown-right"
          right
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <p
              type="button"
              src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/logo_white.png"
              width="30"
              height="30"
              alt="logo"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >{{ username }} </p>
          </template>
          <b-dropdown-item href="#">Another action</b-dropdown-item>

          <b-dropdown-item>gg</b-dropdown-item>
          <b-dropdown-item @click="cerrarSecion()">Salir</b-dropdown-item>
        </b-dropdown>
      </b-nav-text>

      <!--
        <b-nav>
          <b-nav-item
            >Bienvenido <a v-text="username"> </a></b-nav-item>
          <b-nav-item><ModalCreatePost></ModalCreatePost></b-nav-item>
          <b-nav-item
            ><button type="button" id="convert-btn" @click="cerrarSecion()">
              Salir
            </button></b-nav-item
          >
        </b-nav>
        -->
      <!--
      <b-dropdown text="Button text via Prop">
        <b-dropdown-item href="#">An item</b-dropdown-item>
        <b-dropdown-item href="#">Another item</b-dropdown-item>
        <b-dropdown-item><ModalCreatePost></ModalCreatePost></b-dropdown-item>
        <b-dropdown-item>
          <button type="button" id="convert-btn" @click="cerrarSecion()">
            Salir
          </button>
        </b-dropdown-item>
      </b-dropdown>

      <b-dropdown id="dropdown-1" v-text="username" class="m-md-2">
        <b-dropdown-item><ModalCreatePost></ModalCreatePost></b-dropdown-item>
        <b-dropdown-item>
          <button type="button" id="convert-btn" @click="cerrarSecion()">
            Salir
          </button>
        </b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
      </b-dropdown>
      -->
      <!--
      <div>
        You already logged in
        <p v-text="username" />
      </div>
      <ModalCreatePost></ModalCreatePost>
      <button type="button" id="convert-btn" @click="cerrarSecion()">
        Salir
      </button>
        -->
    </div>

    <div v-else>Si no es A, B o C</div>

    <!-- 
    <button type="button" id="convert-btn" @click="openForm()">Open</button>
      -->

    <!-- 
    <vodal :show="show" animation="rotate" @hide="show = false">
      <div>A vue modal with animations.</div>
    </vodal>
      -->

    <!-- 
    <Captcha v-on:event_child="eventChild"></Captcha>
      -->
  </div>
</template>

<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import swal from "sweetalert";
//import Captcha from "./Captcha";
import axios from "axios";
import store from "../store";
import ModalCreatePost from "./modals/ModalCreatePost";
import ModalLogin from "./modals/ModalLogin";

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
    //Captcha,
    ModalCreatePost,
    ModalLogin,
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
      //loginurl:"http://mediawiki.test:8080/api/users"
      //loginurl: "http://localhost:3000/api/user/register",
      //loginurl: "https://agile-everglades-15507.herokuapp.com/api/user/register",
      loginurl: process.env.VUE_APP_API+"/api/user/register",
      //loginurl: "http://localhost:3000/api/user/register",
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