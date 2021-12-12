<template>
  <div id="index">
    <Header appName="Ano-PassPort"></Header>
    <div v-if="loginState == true" class="container pt-3 configuration-wrapper">
      <h2>Generar un token</h2>

      <!--
      <h3>Cambiar nombre de usuario</h3>
      <p>Aqui podras cambiar el nombre de tu perfil.</p>
      <p>Con este token vas a poder usar tu perfil en otros dispositivos.</p>
      -->

      <div class="pt-5">
        <b-form v-if="show">
          <b-form-group id="input-group-1" label-for="input-1">
            <label for="email2" class="mb-2 mr-sm-2" inline
              >Genera un TOKEN para poder loguearse en otros dispositivos</label
            >
          </b-form-group>

          <!-- Using components -->

          <!-- 
            <b-form-input
            v-show="true" 
            v-model="usertoken"
              type="text"
              
              readonly
            ></b-form-input>
            
            -->
          <p></p>

          <b-skeleton-icon
            v-if="usertoken == null"
            icon="box-seam"
            :icon-props="{ fontScale: 2, variant: 'dark' }"
          ></b-skeleton-icon>

          <b-input-group class="mt-3" v-if="usertoken != null">
            <b-input-group-prepend>
              <b-button disabled variant="outline-dark">Token</b-button>
            </b-input-group-prepend>

            <b-form-input
              v-model="usertoken"
              type="text"
              id="testing-code"
              readonly
            ></b-form-input>
            <b-input-group-append>
              <b-button
                variant="outline-success"
                @click="copyTestingCode('testing-code')"
                ><b-icon icon="clipboard" aria-hidden="true"></b-icon
              ></b-button>
            </b-input-group-append>
          </b-input-group>

          <small class="form-text text-muted pt-1 pb-3">
            No compartas este codigo con nadie y ten cuidado de donde lo guardas
          </small>
          <b-button
            type="submit"
            variant="primary"
            class="p-2"
            @click="generateToken"
            >Generar TOKEN</b-button
          >
          <small
            v-if="usertoken != null"
            class="form-text text-muted pt-1 pb-3 text-break"
          >
            este codigo lo puedes ingresar en
            <b-link :href="qrendpoint + '?token=' + usertoken">{{
              qrendpoint + "?token=" + usertoken
            }}</b-link
            ><br />
            o simplemente escanear el codigo qr con tu aplicacion de telefono
            preferida
          </small>

          <div>
            <b-img
              v-if="usertoken != null"
              :src="tokenqr"
              fluid
              alt="Token QR Code"
            ></b-img>
          </div>
        </b-form>
      </div>
    </div>

    <div
      v-if="loginState == false"
      class="container pt-3 configuration-wrapper"
    >
      <small
        >Si queres generar un token tenes que estar logueado si queres loguearte
        con un token</small
      >
    </div>

    <div class="container pt-3 configuration-wrapper">
      <h2>Login usando token</h2>

      <p>
        Este token debe haber sido generado desde una cuenta que ya halla
        inciado sesion en otro dispositivo.
      </p>
      <div v-if="loginState == true" class="mt-3 pt-3 pb-3">
        <b-card-group deck>
          <b-card
            bg-variant="danger"
            text-variant="white"
            header="Alerta"
            class="text-center"
          >
            <b-card-text
              >En este navegador ya has iniciado sesion en
              Anoringa.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <!--
      <h2>Loguearse haciendo uso de un token</h2>
      <h3>Cambiar nombre de usuario</h3>
      <p>Aqui podras cambiar el nombre de tu perfil.</p>
      <p>Con este token vas a poder usar tu perfil en otros dispositivos.</p>
      -->

      <b-input-group class="mt-3 pb-3">
        <b-input-group-prepend>
          <b-button disabled variant="outline-dark">Token</b-button>
        </b-input-group-prepend>

        <b-form-input
          type="text"
          v-model="fromURLtokenValue"
          id="fromURLtokenValue"
          :state="tokenState"
          :readonly="tokenURLState ? true : false"
        ></b-form-input>

        <b-input-group-append>
          <b-button
            variant="outline-success"
            @click="copyTestingCode('fromURLtokenValue')"
            ><b-icon icon="clipboard" aria-hidden="true"></b-icon
          ></b-button>
        </b-input-group-append>
      </b-input-group>

      <b-form-valid-feedback :state="tokenState">
        <p>Excelente</p>
      </b-form-valid-feedback>

      <b-form-invalid-feedback :state="tokenState" class="text-break">
        <p>Los TOKENs de usuario deben ser parecidos al siguiente Ejemplo</p>
        <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>
      </b-form-invalid-feedback>

      <b-button
        type="submit"
        variant="primary"
        class="p-2"
        @click="loginWithToken"
        :disabled="!tokenState || fromURLtokenValue == null ? true : false"
        >Loguearse</b-button
      >
    </div>
    <div v-if="false" class="container pt-3 configuration-wrapper">
      si queres generar un token tenes que estar logueado si queres loguearte
      con un token
    </div>
    <div v-if="false" class="container pt-3 configuration-wrapper">
      si queres generar un token tenes que estar logueado si queres loguearte
      con un token
    </div>
    <div v-else class="container pt-3 configuration-wrapper"></div>
  </div>
</template>

<script>
//import History from "./History";
//import $ from "jquery";
//import qrcode from "qrcode";

import html2canvas from "html2canvas";

//import { mapGetters } from "vuex";
import Header from "./Header";
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

import userMixin from "../mixins/userMixin.js";
//axios.defaults.headers['Content-Type'] = 'application/json';

//import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
export default {
  mixins: [userMixin],
  /*
  props: {
    fromtoken: {
      //type: String,
      required: false,
      default: null,
    },
  },*/
  created() {
    if (this.validateJWT(this.$route.query.token)) {
      console.log("we show the login with JWT");
      this.fromURLtokenValue = this.$route.query.token;
    } else {
      console.log("you didn't give us a token, we can generate one for you");
      this.fromURLtokenValue = null;
    }
  },
  mounted() {},
  metaInfo: {
    //title: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
    meta: [
      {
        vmid: process.env.VUE_APP_NAME + " | PassPort",
        name: process.env.VUE_APP_NAME + " | PassPort",
        content: "Anoringa es un sitio en el que podras discutir anonimamente",
      },
      { charset: "utf-8" },
      {
        name: "description",
        content: "An example Vue application with vue-meta.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    // override the parent template and just use the above title only
    titleTemplate: false,
    htmlAttrs: {
      lang: "es-AR",
      amp: true,
    },
  },
  name: "PassPortPage",
  components: {
    //History,
    Header,
    //VueHcaptcha,
  },
  data() {
    return {
      fromURLtokenValue: null,
      usertoken: null,
      tokenqr: null,
      base64qr: null,
      urlISSUESAPI: process.env.VUE_APP_ISSUESAPI,
      report_loaded: "",
      tickettype: this.query,
      issueForm: {
        form_title: "",
        form_description: "",
        type: this.tickettype,
        //checked: [],
      },
      tiposDeReporte: [
        { text: "Elegi una", value: null },
        "Reporte",
        "Denuncia",
        "Falla",
        "Sugerencia",
      ],
      show: true,
      appName: process.env.VUE_APP_NAME,
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
      loading: false,
      hcaptchaResponse: "",
      loginurl: process.env.VUE_APP_API + "/api/user/register",
      hcaptchatoken: process.env.VUE_APP_HCAPTCHA,
      apiurl: process.env.VUE_APP_API + "/api/user/login",
      qrendpoint: process.env.VUE_APP_URL + "/pasaporte",
    };
  },
  methods: {
    loginWithToken() {
      var cred = this.getCredentialsFromToken(this.fromURLtokenValue);

      if (cred != false) {
        this.userLogin(cred._id, cred.username, cred.password);
      } else {
        console.log("there is some error with the token");
      }
    },
    validateJWT(jwtToValidate) {
      var pattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
      if (jwtToValidate == null) {
        return null;
      } else if (jwtToValidate != null && jwtToValidate.match(pattern)) {
        return true;
      } else {
        return false;
      }
    },

    copyTestingCode(theid) {
      //let testingCodeToCopy = document.querySelector("#testing-code");
      let testingCodeToCopy = document.querySelector("#" + theid);

      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Testing code was copied " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
      //https://codepen.io/PJCHENder/pen/jamJpj

      /* unselect the range */
      //testingCodeToCopy.setAttribute('type', 'hidden')
      //window.getSelection().removeAllRanges()
    },
    async copyURL(mytext = this.usertoken) {
      //clipboard.writeText(mytext);
      navigator.clipboard.writeText(mytext);
      /*
      try {
        await navigator.clipboard.writeText(mytext);
        console.log("clipboard: Copied");




      } catch ($e) {
        console.log("clipboard: Cannot copy");
      }*/
    },
    setToken(theToken) {
      console.log(theToken);
      this.usertoken = theToken;

      var QRCode = require("qrcode");

      var self = this;
      QRCode.toDataURL(
        this.qrendpoint + "?token=" + theToken,
        function (err, url) {
          console.log(url);
          self.tokenqr = url;
        }
      );
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
    genPassPort() {
      html2canvas(document.querySelector("#imageDIV")).then((canvas) => {
        document.body.appendChild(canvas);
      });
      html2canvas(document.querySelector("#imageDIV"), {
        useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
        onrendered: function (canvas) {
          document.body.appendChild(canvas);
          //your functions here
        },
      });
    },
  },
  computed: {
    tokenState: function () {
      // `this` points to the vm instance
      return this.validateJWT(this.fromURLtokenValue);
    },
    tokenURLState: function () {
      // `this` points to the vm instance
      return this.validateJWT(this.$route.query.token);
    },
    tokenValue: function () {
      // `this` points to the vm instance
      return this.$route.query.token;
    },
    loginState: function () {
      // `this` points to the vm instance

      if (
        localStorage.username &&
        localStorage.password &&
        localStorage.userid
      ) {
        console.log("user has been logged previusly");
        return true;
      } else {
        console.log("user needs to log in");
        //https://es.vuejs.org/v2/guide/conditional.html
        return false;
      }
    },
    defaultValue: function () {
      // `this` points to the vm instance
      return this.tiposDeReporte[0];
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

#index {
  //width: 80%;
  margin: 0px;
  padding: 0px;
  text-align: center;
}
</style>

<style scoped>
</style>

<style lang="scss" scoped>
// Mini Reset CSS

/*
commented to fix and issue with the padding of the token value
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*/

body {
  background-color: #0496ff;
  font-family: Montserrat, sans-serif;
}

.configuration-wrapper {
  margin: 0 auto;
}

// Organisms
.o-badge {
  margin: 30px auto;
  width: 950px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

// Molecules
.m-badge {
  width: 300px;
  border-radius: 25px;
  background: #030102;
  /*
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .3);
  */
  cursor: pointer;
  transition: all ease-in 0.3s;

  &:nth-child(2) {
    /*animation: transform_y 2s infinite alternate;
    animation-delay: 1s;
    */
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 30px;
  }

  &__image {
    height: 180px;
    align-self: center;
    margin-top: 40px;
    background-color: #e7c203;
    border-radius: 50%;
  }
  &__image2 {
    margin-left: 50%;
    margin-right: 50%;
    height: 180px;
    align-self: center;
    margin-top: 40px;
    background-color: #e7c203;
    /*border-radius: 50%;*/
  }
  &__image2 > * {
    height: 180px;
    align-self: center;
    background-color: #e7c203;
    /*border-radius: 50%;*/
  }

  &__info {
    margin-top: 20px;
  }

  &__infoName {
    color: #e7c203;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  &__infoCompany {
    color: #e7c203;
    font-size: 22px;
    font-weight: normal;
    letter-spacing: 1px;
  }

  &__social {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    color: #e7c203;
    height: 60px;
    font-size: 14px;
  }

  &__footer {
    text-align: center;
    background: #e7c203;
    height: 50px;
    line-height: 50px;
    border-radius: 0 0 25px 25px;
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 5px;
    color: #000;
  }
  &__footer2 {
    text-align: center;
    background: #e7c203;
    height: 50px;
    line-height: 50px;
    border-radius: 0 0 25px 25px;
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 2px;
    color: #000;
  }

  &:hover {
    /*
    transform: translateY(100px);
    */
  }
}

.m-copyright {
  color: rgba(0, 0, 0, 0.5);
  align-self: flex-end;
  margin-top: 40px;
}

// Components
.a-slot {
  height: 8px;
  width: 50px;
  background-color: #0496ff;
  align-self: center;
  border-radius: 10px;
}

.a-sourceButton {
  margin-top: 130px;
  text-decoration: none;
  padding: 15px 20px;
  background-color: #ea4b89;
  color: #fff;
  border-radius: 15px;
  align-self: center;
  display: flex;
  align-items: center;
}

// Modifiers
.-mr {
  margin-right: 15px;
}

.-ml {
  margin-left: 5px;
}

.-amy {
  background-color: #e7be08;
  /*background-image: linear-gradient(19deg, #e7be08 0%, #f3d042 100%);
  */
}

.-katie {
  background-color: #e48f72;
  background-image: linear-gradient(19deg, #e48f72 0%, #efb08f 100%);
}

.-blackText {
  color: #000;
}
.-yellowText {
  color: white; //#E7C203;//"white"//
}

.-blackBg {
  background-color: #000;
  color: #e78f6c;
}
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap");
.anologo {
  font-family: "Manrope", sans-serif;
  /*
  line-height: 50px;
    text-align: center;
    height: 50px;
    background: #e7c203;
    border-radius: 0 0 25px 25px;
    color: #000;
  */
  font-weight: bold;
  font-size: 22px;
  letter-spacing: 1px;
}
// Animations
/*
@keyframes transform_y {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(80px);
  }
}*/

.tokenqrcode {
  /*
  width:160px;
  height:160px;
  margin-top:15px;
  */
}
.linkeardo {
  color: #2489b3;
  font-weight: bold;
  /*
  text-decoration:underline;
*/
}
</style>