<template>
  <div id="index">
    <Header appName="Ano-PassPort"></Header>
    <div id="canvas"></div>
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
              <!--
        <img class="m-badge__image" src="https://dummyimage.com/300x300/ffffff/000000&text=QR+Code" height="200" alt="">
-->
              <!--
        <img  class='m-badge__image2'src='https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fanoringa.win%2F&chs=180x180&choe=UTF-8&chld=L|2' alt=''>
-->
              <!--
        <div class='m-badge__image2' id="qrcode"></div>
-->
              <!--
          <span class="a-instagram"><i class="fa fa-instagram -mr"></i>@futurejosh</span>
-->
              <!--
        <img class="m-badge__image" src="https://hoodzpahdesign.com/wp-content/uploads/2020/01/skillcamp_seal_black-300x300.png" height="200" alt="">
        -->
              <!--
              <div class="m-badge">
                <section class="m-badge__content">
                  <div class="a-slot"></div>

                  <div class="m-badge__info">
                    <p class="m-badge__infoName">Robertus</p>
                    <i class="m-badge__infoCompany">Acceso de usuario.</i>
                  </div>
                  <div class="m-badge__social">
                    -->
              <div class="m-badge -amy" id="imageDIV">
                <section class="m-badge__content">
                  <div class="a-slot"></div>

                  <img
                    class="m-badge__image2"
                    :src="base64qr"
                    height="200"
                    alt=""
                  />
                  <!--
                  <div
                    class="m-badge__image2"
                    id="qrcodex"
                    :v-model="base64qr"
                  ></div>
                  -->

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
                    src="https://hoodzpahdesign.com/wp-content/uploads/2020/01/skillcamp_seal_black-300x300.png"
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

            <a
              class="a-sourceButton"
              href="https://dribbble.com/shots/10244535-Skill-Camp-2020-Badges-and-Buttons"
              target="_blank"
              >See on Dribble &nbsp;
              <svg width="24" height="24">
                <path
                  d="M3 11h2v2H3v-2m8-6h2v4h-2V5m-2 6h4v4h-2v-2H9v-2m6 0h2v2h2v-2h2v2h-2v2h2v4h-2v2h-2v-2h-4v2h-2v-4h4v-2h2v-2h-2v-2m4 8v-4h-2v4h2M15 3h6v6h-6V3m2 2v2h2V5h-2M3 3h6v6H3V3m2 2v2h2V5H5M3 15h6v6H3v-6m2 2v2h2v-2H5z"
                />
              </svg>
            </a>

            <span class="m-copyright"
              >Coded by Ender İmen
              <i class="fa fa-hand-peace-o -ml"></i>
            </span>
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
    };
  },
  methods: {
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

#qrcode {
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