<template>
  <div class="card card-1 clickAble" :id="id" :href="postlink">
    <!--
    v-bind:style="'background-image: url(' + getPhoto() + ')'"
    -->

    <a
      v-bind:href="'/post/' + id"
      style="display: block; height: 100%; text-decoration: none; color: white"
    >
    <h3 style="" class="thumb-title">{{ title }}</h3>
      <img data-filter="overlay-dark" class="post-image" :alt="photodefault" :src="getPhoto()" />
      <div class="thumb-anim">
        <!--
        <h3 class="thumb-title">{{ title }}</h3>
        <p class="thumb-description">{{ content }}</p>
        -->
      </div>
      <div class="thumb-author">{{ photo }}</div>
      <div class="thumb-author">{{ getImageBrightness(getPhoto()) }}</div>
    </a>
  </div>

  <!--

:style="{ 'background-image':  photo }"
  <div class="card clickAble" :id="id" @click="clicked()">
    <div class="image">
      <img v-bind:src="photo" alt="image" width="200" height="200" />
    </div>
    <div class="content">title: {{ title }}</div>
    <p class="content">content: {{ content }}</p>
  </div>
  -->

  <!--
  <div class="card clickAble" :id="id">
    <div>
      <div class="logo">
        <img v-bind:src="photo" alt="logo" width="200" height="200" />
      </div>
      <h3 class="title">{{ title }}</h3>
      <div class="subtitle">{{ content }}</div>
    </div>
  </div>
      -->

  <!--
    <div class="image" @click="clicked()" :class="cssClasses" v-text="label">
      <img v-bind:src="label" alt="image" width="800" height="600" />
    </div>

    <div class="content">{{ label }}</div>
      -->

  <!--
    <footer class="container">
      <div class="account">
        <a class="register" href="#">Register</a>
        <a class="login" href="#">Login</a>
      </div>
      <div class="icons">
        <a href="#"><i class="fas fa-heart"></i></a>
        <a href="#"><i class="fas fa-share-alt"></i></a>
  </div>
  </footer>
      -->
</template>


<script>
//https://es.vuejs.org/v2/guide/list.html
//v-bind:style="{ 'background-image': 'url(' + photo + ')' }"
export default {
  props: {
    id: {
      //type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    } /*
    message: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    cssClasses: {
      type: String,
      required: false,
    },*/,
    photo: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      photodefault: "https://picsum.photos/200?random=1",
      postlink: "/post/" + this.id,
    };
  },
  mounted() {
    /*
            window.EventHandler.listen('remove-dialog-' + this.id + '-called', (data) => {
                window.location.reload(true);
                console.log(data);
            });*/
  },
  methods: {
    getImageBrightness(imageSrc) {
      return imageSrc;
    },
    getImageBrightness2(imageSrc) {
      var img = document.createElement("img");
      img.src = imageSrc;
      img.style.display = "none";
      document.body.appendChild(img);

      var colorSum = 0;

      img.onload = function () {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, avg;

        for (var x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x + 1];
          b = data[x + 2];

          avg = Math.floor((r + g + b) / 3);
          colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width * this.height));
        return brightness;
      };
    },
    getPhoto() {
      function validURL(str) {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str);
      }
      if (validURL(this.photo)) {
        return this.photo;
      } else {
        return this.photodefault;
      }
    },
    clicked() {
      console.log("clicked");
      console.log(this.id);
      window.location.href = "/post/" + this.id;

      /*
                window.EventHandler.fire('top-confirm', {
                    id: 'remove-dialog-' + this.id,
                    message: this.message,
                    url: this.url
                });
                */
    },
  },
};
</script>


<style lang="scss" scoped>



$darker: #222;
$dark: #555;
$bright: #ddd;


.thumb-title {
  text-transform: uppercase;
  padding: 10px;
  word-wrap: break-word;/*
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
  text-shadow: 2px 2px #000000;*/
  text-shadow: 3px 3px 3px #000000;

  font-size: 24px;
  position: absolute;
  z-index: 3;
  float: bottom;
}

.thumb-description {
  padding: 10px 20px;
  opacity: 0;
  flex: 1;
}

.thumb-author {
  padding: 100px;
  position: relative;
}


.post-image {
  /*
    position: absolute;
    left: -1000%;
    right: -1000%;
    top: -1000%;
    bottom: -1000%;
    margin: auto;
    min-height: 100%;
    min-width: 100%;
    */
    /*
  margin-left: 50rm;
  margin-right: 50rm;
  height: 100%;
  width: auto;
  padding: auto;
  */
  z-index: -1;
  background-color: rgba(0,0,0,.5);
  filter:brightness(0.9);
  /*
  height: 100%;
  width: auto;
  padding: auto;
  */
  padding: 0px;
  height: 100%;
  width: auto;
  margin-left: -50%;
  margin-right: -50%;
}
.card {
  background: #fff;
  border-radius: 2px;
  /*
  background-image: url("http://placekitten.com/300/300");
  display: inline-block;
  */
  display: inline-block;
  height: 200px;
  width: 200px;
  margin: 0.5rem;
  position: relative;

  /*
  */
  flex-flow: column nowrap;
  overflow: hidden;
  color: #fff;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.card-2 {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.card-3 {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.card-4 {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.card-5 {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.thumb-gradient,
.thumb-img {
  position: absolute;
  top: 0;
  left: 0;
  height: 300px;
  width: 300px;
  object-fit: cover;
}


/*
.thumb-anim {
  margin-top: auto;  
  position: relative;
  transition: 0.5s;
  transform: translateY(100%);
}

.thumb-title {
  text-transform: uppercase;
  padding: 10px;
  transition: 0.5s;
  transform: translateY(-100%);
}

.thumb-description {
  padding: 10px 20px;
  transition: 0.5s;
  opacity: 0;
  flex: 1;
}

.thumb-author {
  padding: 100px;
  position: relative;
}

.card:hover .thumb-anim {
  transform: translateY(0);
}

.card:hover .thumb-title {
  transform: translateY(0%);
}

.card:hover .thumb-description {
  opacity: 1;
}*/
/*
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

.card {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  min-width: 200px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.25);
  }
  header {
    display: grid;
    grid-template-columns: 48px 1fr;
    grid-template-rows: 24px 24px;
    grid-template-areas: "logo title" "logo subtitle";
    padding: 0.5rem;
    align-items: center;
    .logo {
      grid-area: logo;
      img {
        border-radius: 50%;
        padding: 0.25rem;
      }
    }
    .title,
    .subtitle {
      padding: 0.25rem;
    }
    .title {
      grid-area: title;
      color: $darker;
    }
    .subtitle {
      grid-area: subtitle;
    }
  } // End Card Header
  .image {
    overflow: hidden;
    img {
      filter: grayscale(50%);
      transition: all 0.5s ease;
      cursor: pointer;
      &:hover {
        filter: none;
      }
    }
  }

  // End card image
  .content,
  footer {
    padding: 1em;
  }
  footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    a {
      text-transform: uppercase;
      padding-right: 0.5rem;
      color: $dark;
      font-weight: 500;
      &:hover {
        color: $darker;
      }
    }
    i {
      font-size: 1.2rem;
      padding-left: 0.5rem;
      color: $dark;
      transition: 0.3s;
      &:hover {
        color: $darker;
      }
    }
  } // End Card Footer
} // End Card
*/
</style>