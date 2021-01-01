<template>
<div style="margin-bottom:100px">
  <b-navbar toggleable="lg" type="dark" variant="info" class="justify-content-between fixed-top">
    <b-navbar-brand href="#">{{appName}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" disabled>Top</b-nav-item>
        <b-nav-item href="#" disabled>Categorias</b-nav-item>
        <b-nav-item href="#" disabled>die Regeln</b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>
        <--
        <b-nav-item-dropdown text="Idioma" right>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">DE</b-dropdown-item>
          <b-dropdown-item href="#">JP</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Usuario</em>
          </template>
          <b-dropdown-item><Login></Login></b-dropdown-item>
          <b-dropdown-item><script async src="//imgurl.me/sdk/pup.js" data-url="https://imgurl.me/upload"></script></b-dropdown-item>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
<!--
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between fixed-top">
        <a class="navbar-brand" href="#">{{appName}}</a>



        <div class="d-none d-md-block d-sm-block d-md-block d-lg-block d-xl-block" style="float: right;"
            id="navbarSupportedContent">
            <ul class="navbar-nav text-right">
                <li class="nav-item">
                    <a class="nav-link" href="#">Top</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Categorias</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">die Regeln</a>
                </li>
            </ul>
        </div>


        <li><Login></Login></li>
        <button class="btn btn-success ml-auto mr-1">User</button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>


        <span class="d-sm-none">

            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto text-righ">

                    <li class="nav-item">
                        <a class="nav-link" href="#">Top</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Categorias</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">die Regeln</a>
                    </li>
                </ul>
            </div>
        </span>

        <div class="d-sm-none">

        </div>

    </nav>}
    -->
    <!-- 
    <nav id="header" class="navbar navbar-expand-lg">
        <h1 class='white-header'>{{appName}}</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><p>im a header</p></li>
          <li><Login></Login></li>
    
    
        </ul>
      
    </nav>
    -->
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
    }},
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
    clickConvert() {},
    convert() {},
    openModal() {

      //https://vuejsexamples.com/tag/popup/
      //https://vuejsexamples.com/a-small-wrapper-for-integrating-sweetalert-to-vuejs/
      //https://sweetalert.js.org/guides/#installation
 

      //https://vuejsexamples.com/simple-lightweight-and-elegant-global-notification-popup-for-vue-js/

      //https://stackoverflow.com/questions/50015336/google-recaptcha-within-sweetalert-modal-window
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          console.log('LOGGED IN');
          
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          console.log('NOT LOGGED IN');
          swal("Your imaginary file is safe!");
        }
      });
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

/*
.navbar {
    background-color: #F95453;
    margin-bottom: 20px;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
}

*/
h1.white-header {
    color: #FFFFFF;
    font-size: 2em;
}
/**/
* {
  box-sizing: border-box;
  margin: 0;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
}
a {
  text-decoration: none;
  &:hover {
  }
}
header {
  margin: 0;
    width: 100%;
    padding: 0.5rem 0;
    background: $darker;
    color: $bright;
    position: fixed;
    z-index: 0;
    > .container {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
}


body {
  margin: 0;
  color: $dark;
  background: $bright;
  font-family: "Segoe UI", "Roboto", Arial, Helvetica, sans-serif;
  font-size: 14px;
  > header {
    width: 100%;
    padding: 0.5rem 0;
    background: $darker;
    color: $bright;
    position: fixed;
    z-index: 1;
    > .container {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  > footer {
    background-color: $darker;
    color: $bright;
    padding: 1rem;
    text-align: center;
  } // End Footer
}
nav {
  //padding: 0.5rem 0.5rem;
  a {
    color: $bright;
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
  ul {
    list-style: none;
    display: flex;
    li {
      padding-left: 1rem;
    }
  }
}
main {
  padding-top: 5rem;
  padding-bottom: 3rem;
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>