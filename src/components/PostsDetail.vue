<template>
  <main>
    <div class="container" v-if="loaded_correctly === true">
    <div>Post id : {{ $route.params.id }}</div>
    <div class="container-fluid">
      <!--
      <h1>Some Anoringa Post</h1>
      <p>Resize the browser window to see the effect.</p>
      <p>
        The columns will automatically stack on top of each other when the
        screen is less than 576px wide.
      </p>
      -->
      <div class="row">
        <div class="col-md-6" style="background-color: lavender">
          .col-sm-6

          <div class="">
            <img
              src="https://www.w3schools.com/bootstrap4/cinqueterre.jpg"
              class="img-fluid post-img"
              alt="Responsive image"
            />
          </div>

          <h2>{{title}}</h2>
          <p>{{content}}</p>
          <!--
          <p>
            Bacon ipsum dolor sit amet capicola ball tip beef ribs leberkas,
            turkey biltong salami shoulder ribeye. Leberkas chuck cow andouille
            kevin ribeye pork strip steak pork chop beef ribs beef ball tip
            corned beef. Leberkas prosciutto brisket, short ribs salami cow
            sirloin chicken. Bacon pork belly bresaola tenderloin biltong
            leberkas. Strip steak beef leberkas sirloin, venison turkey
            hamburger kevin. Drumstick chicken ground round t-bone flank fatback
            jerky ball tip. Jerky ribeye sirloin t-bone.
          </p>

          <p>
            Tongue prosciutto pork ball tip ham hock, meatball sirloin brisket
            kielbasa biltong doner shoulder bresaola. Chuck beef ribs biltong,
            kielbasa ground round swine andouille corned beef. Venison hamburger
            tongue shank. Leberkas doner pork chop sausage kielbasa pancetta,
            biltong brisket pastrami tenderloin boudin filet mignon sirloin cow
            meatloaf. Ham ball tip bacon pork belly sirloin.
          </p>

          <p>
            Shoulder pig short ribs, salami chicken venison bresaola.
            Frankfurter meatball pork chop pork loin, turkey strip steak
            kielbasa pork belly drumstick shank prosciutto. Pork chicken ground
            round, sirloin tri-tip ham hock pork chop cow meatloaf pork loin
            bresaola turkey. Prosciutto hamburger pork short ribs flank tri-tip
            chicken pig bacon meatloaf t-bone shankle doner. Bresaola doner
            spare ribs biltong jowl boudin, tri-tip pork leberkas ham hock filet
            mignon.
          </p>

          <p>
            Leberkas strip steak shoulder meatball, flank biltong shank fatback
            ball tip swine prosciutto hamburger. Jerky frankfurter drumstick,
            ham ham hock hamburger kevin kielbasa salami chuck. Flank rump beef
            cow, beef ribs meatball ball tip jowl bacon pork chop. Biltong
            tongue pork chop hamburger. Frankfurter tri-tip pancetta pork chop
            venison t-bone andouille beef ribs salami boudin meatball doner
            spare ribs. Brisket pork chop pig kielbasa jerky chuck pork belly
            beef meatball boudin short loin. Doner jerky andouille ham meatloaf
            prosciutto kevin pork belly short loin pancetta.
          </p>

          <p>
            Corned beef spare ribs hamburger pork tenderloin flank pork loin
            beef ribs sausage brisket chicken venison bacon short loin sirloin.
            Ribeye tail short ribs andouille kevin chicken shankle meatloaf,
            corned beef rump sirloin t-bone chuck tongue. Swine venison tongue,
            sirloin turducken drumstick bresaola strip steak rump. Kevin ham
            hock meatball tri-tip. Ground round leberkas pig beef salami strip
            steak meatball beef ribs. Chicken ball tip rump, short loin bresaola
            pork t-bone jerky jowl pork chop tail chuck sausage prosciutto.
          </p>
          -->

        </div>
        <div class="col-md-6" style="background-color: lavenderblush">
          .col-sm-6
          <h2>Right Column</h2>
          <h1>Comment Widget</h1>
          <div style="width: 100%">
            <form>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </div>
                <div class="col">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter password"
                    name="pswd"
                  />
                </div>
              </div>
            </form>
            <form class="form-group">
              <label for="textarea_mesaj_colaborare">Tags:</label>
              <input
                id="textarea_mesaj_colaborare"
                class="form-control"
                size="50"
              />
              <label for="comment">Comment:</label>
              <textarea class="form-control" rows="5" id="comment"></textarea>
              <button id="comentar" type="button" class="btn btn-warning">
                Comentar
              </button>
            </form>

            <div id="comentarios"></div>
          </div>
        </div>
      </div>
    </div>

    </div>
    <div v-else>
      <p>no se encontro el post que estas buscando</p>
    </div>
  </main>
</template>




<script>
//import History from "./History";
//import { mapGetters } from "vuex";

import axios from "axios";

export default {
  data() {
    return {
      //posts: [],
      comments: [],
      postexample: [],
      //endpoint: "http://localhost:3000/api/post",
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post",
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post/" + this.$route.params.id,
      endpoint: "http://localhost:3000/api/post/" + this.$route.params.id,
      //https://agile-everglades-15507.herokuapp.com/api/post/5fea65d576140b6b2093cdb7
      examplesource: "https://jsonplaceholder.typicode.com/posts/",

      id: "asdasdasd",
      url: "asdasdasd",
      photo: "https://picsum.photos/200?random=1",
      title: "some title",
      content: "some scrap contenido",
      loaded_correctly: false,
    };
  },
  components: {},

  created() {
    this.getPostDetail();
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    /*
    post: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      );

      //  :key="item._id""item._id" "url" "photo" title description

      //this.item = ['<call-dialog-link :id="id" :url="url" :photo="photo" :title="new message socket" message="Are you sure you wish to remove this record?" content="Are you sure you wish to remove this record?" label="Remove" css-classes="alert" ></call-dialog-link>'];
      this.post.push(data);
    },
    */
  },
  mounted() {
    /*
            window.EventHandler.listen('remove-dialog-' + this.id + '-called', (data) => {
                window.location.reload(true);
                console.log(data);
            });*/
    /*
    this.$root.$on("component1", () => {
      // your code goes here
      //this.c1method()
      console.log("from other component");
    });*/
    /**/
  },
  methods: {
    getPostsExample() {
      axios
        .get(this.examplesource)
        .then((response) => {
          this.postexample = response.data;
          console.log("-----data-------");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
        });
    },
    getPostDetail() {
      axios
        .get(this.endpoint)
        .then((response) => {
          this.post = response.data.data;
          console.log("-----posts data-------");
          console.log(response.data);
          this.loaded_correctly = true;
          this.title = this.post.title;
          this.content = this.post.description;
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
        });
    },
  },
};
</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
* {
  margin: 0;
  padding: 0;
}

body {
  background: #e2e1e0;
}
/*
#index {
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 50px;
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

*/

$darker: #222;
$dark: #555;
$bright: #ddd;

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

nav {
  padding: 0.5rem 0;
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
/*
main {
  padding-top: 5rem;
  padding-bottom: 3rem;
}
*/
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.card-grid {
  text-align: center;
  font: 14px/1.4 sans-serif;
  //display: grid;
  // grid-template-columns: repeat(3, minmax(200px, 1fr));
  //grid-gap: 1rem;
}

// Responsive
@media (max-width: 768px) {
  .card-grid {
    //grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}
@media (max-width: 540px) {
  .card-grid {
    //grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
}
</style>