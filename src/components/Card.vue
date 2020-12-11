<template>
  <div class="card clickAble" :id="id" @click="clicked()">
    <div class="image">
      <img v-bind:src="photo" alt="image" width="200" height="200" />
    </div>
    <div class="content">{{ title }}</div>
  </div>

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
export default {
  props: {
    id: {
      //type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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
    },
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
  mounted() {
    /*
            window.EventHandler.listen('remove-dialog-' + this.id + '-called', (data) => {
                window.location.reload(true);
                console.log(data);
            });*/
  },
  methods: {
    clicked() {
      console.log('clicked');
      console.log(this.id);

      
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
</style>