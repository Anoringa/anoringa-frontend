// src/mixins/clickMixin.js

import jwt_decode from "jwt-decode";
import store from "../store";

import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";


import globalMixin from "../mixins/globalMixin.js";
export default {
  mixins: [globalMixin],
  data() {
    return {
      apiurl: process.env.VUE_APP_API + "/api/user/login",
      credenciales: { username: "", password: "" },
      username: "",
      password: "",
      userid: "",
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
    userid(newName) {
      localStorage.userid = newName;
    },
  },
  methods: {
    clicked(value) {
      alert(value);
    },
    userSave(credenciales) {
      console.log("we are going to save the user credentials", credenciales);
      this.username = credenciales.username;
      this.password = credenciales.password;
      this.userid = credenciales._id;

      //this.credenciales["username"] = credenciales.username;
      //this.credenciales["password"] = credenciales.password;


      console.log("credencial", this.credenciales);
      store.commit("SET_PRODUCTS", this.credenciales);
      //this.loggedstate = true;
      console.log("User already saved", credenciales);
    },
    getCredentialsFromToken(token) {
      try {
        var decoded = jwt_decode(token);
        console.log(decoded);

        if (decoded.username && decoded.password && decoded._id) {
          return decoded;
        } else {
          console.log("jwt error");
          console.log(decoded);
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    userLogin(id,user, pass) {
      console.log("user : ", user)
      console.log("pass : ", pass)
      console.log("id   : ", id)

      var params = new URLSearchParams();

      params.append("id", id);
      params.append("username", user);
      params.append("password", pass);

      console.log("params");
      console.log(params.toString());

      //var self = this;
      axios
        .post(this.apiurl, params)
        .then((response) => {
          console.log("response");
          console.log(response);
          this.userStore(response);
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error data", error.response.data);

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
        const changeEvent = new Event("userDataEvent");
        dispatchEvent(changeEvent);
    },
    userStoreOld(response) {
      console.log("Username Store response", response);
      //console.log("Username Changed response data", response.data);
      //console.log("Username Changed data.data", response.data.data);

      var credenciales = response.data.data;
      this.username = credenciales.username;
      this.password = credenciales.password;
      this.userid = credenciales._id;

      this.credenciales["username"] = credenciales.username;
      this.credenciales["password"] = credenciales.password;
      this.credenciales["userid"] = credenciales._id;
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
      //this.loggedstate = true;

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

      console.log("this.$store.state.credentials")
      console.log(this.$store.state.credentials)

      //location.reload();
      //const changeEvent = new Event("userDataEvent");
      //dispatchEvent(changeEvent);
      //dispatchEvent(new Event("userDataEvent"));

      localStorage.username = credenciales.username;
      localStorage.password = credenciales.password;
      localStorage.userid = credenciales._id;


      const changeEvent = new Event("userDataEvent");

      dispatchEvent(changeEvent);


    },
    generateToken(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form));

      var params = new URLSearchParams();

      params.append("id", localStorage.userid);
      params.append("username", localStorage.username);
      params.append("password", localStorage.password);

      console.log("params");
      console.log(params.toString());

      //var self = this;
      axios
        .post(this.apiurl, params)
        .then((response) => {
          console.log("response");
          console.log(response);
          this.setToken(response.data.data.token);
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
  }
};