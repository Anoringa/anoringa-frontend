<template>
  <div id="index">
    <Header :appName="appName" ></Header>
    <!--
      <p>{{appName}}</p>
    -->
    <PostsDetail></PostsDetail>

    <footer>
      <p>
        <a href="#">Contact Us</a> | <a href="#">Sitemap</a> |
        <a href="#">Privacy Policy</a>
      </p>
      <p>&copy;2020 Copyright info here...</p>
    </footer>
  </div>
</template>


<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Header from "./Header";
import PostsDetail from "./PostsDetail";
export default {
  name: "Index",
  components: {
    //History,
    Header,
    PostsDetail
  },
  data() {
    return {
      appName: "Anoringa",
      apiKey: "<YOUR_RAPIDAPI_KEY>",
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      result: 0,
      convertClicked: false,
      loading: false,
    };
  },
  methods: {
    clickConvert() {},
    convert() {}
  }
}

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