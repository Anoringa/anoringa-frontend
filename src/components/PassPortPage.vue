<template>
  <div id="index">
    <Header appName="Ano-PassPort"></Header>
    <div id="canvas"></div>

    <div class="container pt-3 configuration-wrapper">
      <h2>Configuraciones</h2>

      <!--
      <h3>Cambiar nombre de usuario</h3>
      <p>Aqui podras cambiar el nombre de tu perfil.</p>
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
              <b-button variant="outline-success" @click="copyTestingCode"
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
          <small class="form-text text-muted pt-1 pb-3">
            este codigo lo puedes ingresar en
            <b-link :href="qrendpoint">{{ qrendpoint }}</b-link
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
    <!--
    <b-container class="bv-example-row pt-5">
      <b-row class="justify-content-md-center">
        <b-col col xl="6" lg="8" md="8" sm="12">
          <input
            id="text"
            type="text"
            value="{'user':'juan','password':'password'}"
            style="width: 80%"
          /><br />

          <div class="o-badge">
            <div class="o-badge__group">
              <div class="m-badge -amy" id="imageDIV">
                <section class="m-badge__content">
                  <div class="a-slot"></div>

                  <img
                    class="m-badge__image2"
                    :src="base64qr"
                    height="200"
                    alt=""
                  />
                 

                  <div class="m-badge__info">
                    <p class="m-badge__infoName -blackText">Robertus</p>
                    <i class="m-badge__infoCompany -blackText"
                      >Acceso de usuario.</i
                    >
                  </div>
                  <div class="m-badge__social">
                    <span class="a-facebook -blackText"
                      ><i class="fa fa-twitter -mr"></i>@anoringa2</span
                    >
                    <span class="a-link -blackText"
                      ><i class="fa fa-link -mr"></i>visita
                      <a class="linkeardo">https://anoringa.win</a></span
                    >
                  </div>
                </section>

                <footer class="m-badge__footer2 -blackBg">
                  <a class="anologo">ANO</a> <a class="-yellowText">PassPort</a>
                </footer>
              </div>
              <div class="m-badge -katie">
                <section class="m-badge__content">
                  <div class="a-slot"></div>
                  <img
                    class="m-badge__image"
                    src="https://dummyimage.com/300x300/ffffff/000000&text=QR+Code"
                    height="200"
                    alt=""
                  />
                  <div class="m-badge__info">
                    <p class="m-badge__infoName -blackText">Katie Cooper</p>
                    <i class="m-badge__infoCompany -blackText"
                      >Real Tanecious</i
                    >
                  </div>
                  <div class="m-badge__social -blackText">
                    <span class="a-instagram"
                      ><i class="fa fa-instagram -mr"></i>@realtanecious_</span
                    >
                    <span class="a-facebook"
                      ><i class="fa fa-twitter -mr"></i>@realtanecious_</span
                    >
                    <span class="a-website"
                      ><i class="fa fa-long-arrow-right -mr"></i
                      >realtanecious.com</span
                    >
                  </div>
                </section>
                <footer class="m-badge__footer">DESIGNER</footer>
              </div>
            </div>
            </div>

          <div class="o-badge">
            <a class="a-sourceButton" id="download" target="_blank"
              >Download &nbsp;
              <svg width="24" height="24">
                <path
                  d="M3 11h2v2H3v-2m8-6h2v4h-2V5m-2 6h4v4h-2v-2H9v-2m6 0h2v2h2v-2h2v2h-2v2h2v4h-2v2h-2v-2h-4v2h-2v-4h4v-2h2v-2h-2v-2m4 8v-4h-2v4h2M15 3h6v6h-6V3m2 2v2h2V5h-2M3 3h6v6H3V3m2 2v2h2V5H5M3 15h6v6H3v-6m2 2v2h2v-2H5z"
                />
              </svg>
            </a>
          </div>

          <div id="previewImage"></div>
        </b-col>
      </b-row>
    </b-container>
    -->
    <footer class="pt-5"></footer>
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
//import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
export default {
  props: {
    query: {
      type: String,
      required: false,
      default: "Sugerencia",
    },
  },
  mounted() {
    /*
    var QRCode = require("qrcode");

    var self = this;
    QRCode.toDataURL("I am a pony!", function (err, url) {
      console.log(url);
      self.base64qr = url;
      self.genPassPort();
    });

    //var canvas = document.getElementById('canvas')
    QRCode.toCanvas("I am a pony!", function (err, url) {
      console.log(url);
    });
    */
  },
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
      qrendpoint: process.env.VUE_APP_URL + "/token/",
    };
  },
  methods: {
            copyTestingCode () {
          let testingCodeToCopy = document.querySelector('#testing-code')
          testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
          testingCodeToCopy.select()

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Testing code was copied ' + msg);
          } catch (err) {
            console.log('Oops, unable to copy');
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
      QRCode.toDataURL(this.qrendpoint + theToken, function (err, url) {
        console.log(url);
        self.tokenqr = url;
      });
    },
    generateToken(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form));

      var params = new URLSearchParams();

      params.append("id", localStorage.userid);
      params.append("username", localStorage.username);
      params.append("password", localStorage.password);

      console.log("params");
      console.log(params);

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
    onChangeFormSelect(event) {
      //event.preventDefault();
      console.log("😎🔄onChangeFormSelect: ", event);
      this.issueForm.type = event;
      console.log("form after onChangeFormSelect: ", this.issueForm);
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.issueForm.email = "";
      this.issueForm.name = "";
      this.issueForm.food = null;
      //this.issueForm.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onErrorImagekit(err) {
      console.log("Error");
      console.log(err);
    },
    onSuccessImagekit(res) {
      console.log("Success");
      console.log(res);
    },
    clickConvert() {},
    convert() {},
    userStore(respuesta) {
      console.log(respuesta);
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
    onVerify(response) {
      console.log(response);
      this.hcaptchaResponse = response;
      this.userCreate(response);
      //this.$emit("event_child", this.hcaptchaResponse);
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
  },
  computed: {
    tokenState: function () {
      // `this` points to the vm instance
      return true;
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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