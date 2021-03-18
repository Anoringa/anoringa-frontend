<template>
    
  <div id="index">
    <Header :appName="appName" ></Header>
    <!--
      <p>{{appName}}</p>
    -->
    <Footer></Footer>

  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
    
  name: "ChangeUsernamePage",
  components: {
    //History,
    Header,
    Footer,
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

<style>

</style>