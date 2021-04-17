<template>
  <div id="index">
    <Header :appName="appName"></Header>
    <!--
      <p>{{appName}}</p>
    -->
    <b-jumbotron
      header="La Configuracion"
      lead="aqui podras cambiar el nombre de tu perfil"
    >
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-2" label="Tu Nombre:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Ingresa un nuevo nombre"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox v-model="form.checked" name="check-button" switch
          >Entiendo que es posible que este nombre pueda no volver a estar
          disponible</b-form-checkbox
        >

        <!--
          <p>(Checked: {{ form.checked }})</p>
          -->

        <b-button type="submit" variant="primary">Cambiar</b-button>
      </b-form>
      <!--
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
      -->
    </b-jumbotron>
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
      apiurl: process.env.VUE_APP_API + "/api/user/modify",
      form: {
        name: "",
        checked: false,
      },
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
    userStore(response) {
      console.log("User Created", response);
      console.log("User Created data", response.data);
      console.log("User Created data.data", response.data.data);
      var credenciales = response.data.data;
      this.username = credenciales.username;
      this.password = credenciales.password;
      this.userid = credenciales._id;

      this.credenciales["username"] = credenciales.username;
      this.credenciales["password"] = credenciales.password;
      console.log("credencial", this.credenciales);
      store.commit("SET_PRODUCTS", this.credenciales);
      this.loggedstate = true;
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
      params.append("data", this.form.name); // new username
      console.log("params");
      console.log(params);
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
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
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

<style>
</style>