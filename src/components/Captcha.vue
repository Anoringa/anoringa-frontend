
<template>
    <vue-hcaptcha sitekey="e7f6e9a7-84b3-4b26-ae5a-c71eda77bacc" @verify="onVerify" theme="dark"></vue-hcaptcha>
</template>

<script >
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
import axios from "axios";

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

/*
axios
      .get('http://mediawiki.test:7070/api/users')
      .then(response => (console.log(response)))
  .catch(response => console.log(response))
      .finally(() => console.log("OK"))
*/
axios
  .get("http://mediawiki.test:7070/api/users/")
  .then((response) => {
    console.log(response);
  })
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

export default {
  //https://codepen.io/ben_jacobson/pen/MWwbvZe
  //https://jsfiddle.net/tiagomatosweb/vqtnpyzw/
  //https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events
  props: {
  },
  name: "Captcha",
  components: {
    //History,
    VueHcaptcha
  },
  data() {
    return {
      hcaptchaResponse: "",
      jwt:"",
      credenciales:{},
      username:"",
      password:"",
      loading: false,
    };
  },
  methods: {
		emit: function() {
			this.$emit('event_child', this.hcaptchaResponse)
		},
  created() {
    this.size = this.visible ? "normal" : "invisible";
  },
  execute() {
    //((this.$refs.captcha as unknown) as HCaptchaMethods).execute();
  },
  onVerify(response) {
    console.log(response);
    this.hcaptchaResponse = response;
    this.$emit('event_child', this.hcaptchaResponse)
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
  }}
  //https://github.com/hCaptcha/vue-hcaptcha
  //https://docs.hcaptcha.com/#localdev
}
</script>
