<template>
<div>


  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand tag="h1" class="p-1"
    @click="clicked()">Anoringa</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!--

      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>
   -->
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>
        -->
        
                <b-nav-item class="nav-item">
                    <a class="nav-link" href="#">Top</a>
                </b-nav-item>
                <b-nav-item class="nav-item">
                    <a class="nav-link" href="#">Categorias</a>
                </b-nav-item>
                <b-nav-item class="nav-item">
                    <a class="nav-link" href="#">die Regeln</a>
                </b-nav-item>
        <!--
          
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
        -->

          <Login></Login>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

    <!--
  <header id="header">
    <div class="container">
      <h1>{{appName}}</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><p>im a header</p></li>
          <li><button type="button" id="convert-btn" @click="openModal()">Login</button></li>
    
    
        </ul>
      </nav>
    </div>
  </header>
      -->

</template>


<script>
//import History from "./History";
//import { mapGetters } from "vuex";
import Login from "./Login";
import swal from "sweetalert";

export default {
  props: {
    appName: {
      type: String,
      required: true,
    },
    appName: {
      type: String,
      required: true,
    }
    },
  name: "Header",
  components: {
    //History,
    Login
  },
  data() {
    return {
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
    clicked() {
      //console.log("clicked");
      //console.log(this.id);
      window.location.href = "/";
    },
    clickConvert() {},
    convert() {},
    openModal() {}
    }
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

$darker: #222;
$dark: #555;
$bright: #ddd;


</style>