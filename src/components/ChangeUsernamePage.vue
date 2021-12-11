<template>
  <div id="index">
    <Header :appName="appName"></Header>
    <!--
      <p>{{appName}}</p>
    -->

    <div class="container pt-3 configuration-wrapper">
      <h2>Configuraciones</h2>

      <!--
      <h3>Cambiar nombre de usuario</h3>
      <p>Aqui podras cambiar el nombre de tu perfil.</p>
      -->

      <div class="pt-5">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label-for="input-1">
            <label for="email2" class="mb-2 mr-sm-2" inline
              >Cambiar mi nombre de usuario</label
            >
            <b-form-input
              id="input-1"
              v-model="posibleNewName"
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
              Los nombres de usuario pueden tener desde 2 hasta 32 caracteres
              entre letras minusculas, mayusculas, numeros y caracteres
              especiales como: ¡ ! ¿ ? @ ç Ç . ,
            </p></b-form-invalid-feedback
          >
          <small class="form-text text-muted pt-1 pb-3">
            Entiendo que es posible que este nombre pueda no volver a estar
            disponible.
          </small>
          <b-button type="submit" variant="primary">Cambiar</b-button>
        </b-form>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

import store from "../store";

import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default {
  name: "ChangeUsernamePage",

  computed: {
    newUsernameState() {
      var NewName = this.posibleNewName;
      //console.log(NewName);
      let pattern = /^[¡!¿?@çÇ.,a-zA-Z\d\-_\s]{2,32}$/;
      if (
        this.posibleNewName != null &&
        NewName.match(pattern) &&
        !this.usernameAlreadyInUse
      ) {
        return true;
      } else if (this.posibleNewName == null && !this.usernameAlreadyInUse) {
        return null;
      } else {
        return false;
      }
    },
    newUsernameStateOld() {
      //var NewName = this.posibleNewName;
      var NewName = this.posibleNewName;
      //console.log(NewName);
      //let pattern = /^[0-9a-zA-Z Ññ@:().,-_]*$/;
      let pattern = /^[¡!¿?@çÇ.,a-zA-Z\d\-_\s]{2,32}$/;

      if (NewName.match(pattern)) {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    //History,
    Header,
    Footer,
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
    userid(newName) {
      localStorage.userid = newName;
    },
  },
  data() {
    return {
      usertriedtosubmit: false,
      usernameAlreadyInUse: false,
      apiurl: process.env.VUE_APP_API + "/api/user/modify",
      form: {
        name: "",
        checked: false,
      },
      posibleNewName: null,
      show: true,
      appName: "Anoringa",
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
      loading: false,
      credenciales: { username: "", password: "" },
      username: "",
      password: "",
      userid: "",
    };
  },
  methods: {
    makeToast(append = false, errorTitle, errorMessage, variant) {
      this.toastCount++;
      this.$bvToast.toast(errorMessage, {
        title: errorTitle,
        autoHideDelay: 2500,
        appendToast: append,
        variant: variant, //"warning",

        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },

    userStore(response) {
      console.log("Username Changed response", response);
      //console.log("Username Changed response data", response.data);
      //console.log("Username Changed data.data", response.data.data);

      var credenciales = response.data.data;
      this.username = credenciales.username;
      this.password = credenciales.password;
      this.userid = credenciales._id;

      this.credenciales["username"] = credenciales.username;
      this.credenciales["password"] = credenciales.password;
      console.log("credencial", this.credenciales);
      store.commit("SET_PRODUCTS", this.credenciales);
      this.loggedstate = true;

      this.makeToast(
        false,
        "cambiaste el nombre de usuario",
        response.data.message,
        "success"
      );

      store.commit({
        type: "setUsername",
        data: credenciales.username,
      });
    },

    unicodeEscape(str) {
      return str.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
      });
    },
    clickConvert() {},
    convert() {},
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form));

      var params = new URLSearchParams();

      params.append("_id", localStorage.userid);
      params.append("username", localStorage.username);
      params.append("password", localStorage.password);
      params.append("data", this.posibleNewName); // new username
      console.log("params");
      console.log(params);

      var self = this;
      axios
        .post(this.apiurl, params)
        .then((response) => {
          console.log("response");
          console.log(response);
          this.userStore(response);
        })
        /*
        .then(
          (response) =>
            function () {
              console.log("response");
              console.log(response);
              this.userStore(response);
            }
        )*/
        //.then((response) => console.log(response))
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error data", error.response.data);
            console.log("error data", error.response.data.data[0].msg);

            self.makeToast(
              false,
              "el error 2",
              error.response.data.data[0].msg,
              "warning"
            );

            if (
              error.response.data.data[0].msg == "Username is already in use"
            ) {
              this.usernameAlreadyInUse = true;
              console.log("SIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
            } else {
              console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            }

            console.log("error status", error.response.status);
            console.log("error headers", error.response.headers);
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
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.posibleNewName = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#index {
  @include dynamic-theme() {
    background-color: theme($background-color);
  }

  height: 100vh;
}

.configuration-wrapper {
  padding-bottom: 40vh;
}
</style>