<template>
  <div id="index">
    <Header :appName="appName"></Header>

    <b-container class="bv-example-row pt-5">
      <b-row class="justify-content-md-center">
        <b-col col xl="6" lg="8" md="8" sm="12">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-3" label="Tipo:" label-for="input-3">
              <b-form-select
                @change="onChangeFormSelect"
                id="input-3"
                v-model="tickettype"
                :options="tiposDeReporte"
                required
                class="input-form"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Descripcion breve:"
              label-for="input-1"
              description=""
            >
              <figcaption>
                <label style="font-size: 0.7rem">Acotada y sencilla</label>
              </figcaption>
              <b-form-input
                id="input-1"
                v-model="issueForm.form_title"
                type="text"
                placeholder="Describi brevemente"
                required
                class="input-form"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Descripcion:"
              label-for="input-2"
            >
              <b-form-textarea
                id="input-2"
                v-model="issueForm.form_description"
                placeholder="Describi detalladamente"
                required
                rows="4"
                class="input-form"
              ></b-form-textarea>
            </b-form-group>

            <!--
            <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                v-model="issueForm.checked"
                id="checkboxes-4"
                :aria-describedby="ariaDescribedby"
                >

                <b-form-checkbox value="me">Check me out</b-form-checkbox>
                <b-form-checkbox value="that">Check that out</b-form-checkbox>


              </b-form-checkbox-group>
            </b-form-group>
                -->

            <b-button type="submit" variant="primary">Enviar</b-button>
            <b-button type="reset" variant="danger">Cancelar</b-button>
          </b-form>

          <div class="" v-if="report_loaded == ''"></div>
          <div v-if="report_loaded == 'OK'">Reporte enviado</div>
          <div v-else-if="report_loaded == 'LOADING'" style="height: 100%">
            Cargando <b-spinner variant="danger" key="danger"></b-spinner>
          </div>
          <div v-else-if="report_loaded == 'ERROR'" style="height: 100%">
            ERROR
          </div>

          <!--
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
          -->
        </b-col>
      </b-row>
    </b-container>
    <footer class="pt-5">
      <a href="https://github.com/orgs/Anoringa/projects/1"
        >Ver los tickets abiertos</a
      >
    </footer>
  </div>
</template>

<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Header from "./Header";
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
//import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
export default {
  /*
  props: {
    type: {
      required: false,
      default: "Sugerencia",
    },
  },*/
  created() {
    var typeFromQuery = this.$route.query.type;
    //console.log(sortFromQuery);
    if (typeFromQuery == "Reporte") {
      this.tickettype = "Reporte";
    } else if (typeFromQuery == "Denuncia") {
      this.tickettype = "Denuncia";
    } else if (typeFromQuery == "Falla") {
      this.tickettype = "Falla";
    } else {
      this.tickettype = "Sugerencia";
    }
  },
  /*
  props: {
    query: {
      type: String,
      required: false,
      default: "Sugerencia",
    },
  },*/
  mounted() {
    /**/
  },
  metaInfo: {
    //title: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
    meta: [
      {
        vmid: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
        name: process.env.VUE_APP_NAME + " | Comenta y postea anonimamente",
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
  name: "ReportPage",
  components: {
    //History,
    Header,
    //VueHcaptcha,
  },
  data() {
    return {
      urlISSUESAPI: process.env.VUE_APP_ISSUESAPI,
      report_loaded: "",
      tickettype: "Sugerencia",
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
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.form));

      /*
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open(
        "POST",
        "https://anoringa-issues.herokuapp.com/issue?ISSUE_TITLE=" +
          this.issueForm.form_title +
          "&ISSUE_BODY=" +
          this.issueForm.form_description +
          "&ISSUE_LABELS=%5B%22" +
          this.issueForm.type +
          "%22%5D"
      );

      xhr.send();
      */

      this.report_loaded = "LOADING";

      /*
      axios.post(
          "https://anoringa-issues.herokuapp.com/issue?ISSUE_TITLE=" +
            this.issueForm.form_title +
            "&ISSUE_BODY=" +
            this.issueForm.form_description +
            "&ISSUE_LABELS=%5B%22" +
            this.issueForm.type +
            "%22%5D"
        )
        .then((response) => {
          this.report_loaded = "OK";
          console.log(response);
        })
        .catch(function (error) {
          this.report_loaded = "ERROR";
          console.log(error.response);
        });
      */
      /*
      var config = {
        method: "post",
        //url: 'https://anoringa-issues.herokuapp.com/issue?ISSUE_TITLE=no funciona el bot&ISSUE_BODY=este es un test from cloud&ISSUE_LABELS=["ticket"]',
        // https://anoringa-issues.herokuapp.com
        url:
          this.urlISSUESAPI+"/issue?ISSUE_TITLE=" +
          this.issueForm.form_title +
          "&ISSUE_BODY=" +
          this.issueForm.form_description +
          "&ISSUE_LABELS=%5B%22" +
          this.issueForm.type +
          "%22%5D",

        headers: {
          //"Access-Control-Allow-Headers": "Content-Type, Authorization",
          //"Access-Control-Allow-Origin": "*",
          //"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));

          this.report_loaded = "OK";
          console.log(response);
        })
        .catch(function (error) {
          this.report_loaded = "ERROR";
          console.log(error.response);
          console.log(error);
        });
        */

      axios
        .post(
          this.urlISSUESAPI +
            "/issue?ISSUE_TITLE=" +
            this.issueForm.form_title +
            "&ISSUE_BODY=" +
            this.issueForm.form_description +
            "&ISSUE_LABELS=%5B%22" +
            this.issueForm.type +
            "%22%5D"
        )
        .then((response) => {
          this.report_loaded = "OK";
          console.log(response);
        })
        .catch(function (error) {
          this.report_loaded = "ERROR";
          console.log(error.response);
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
</style>