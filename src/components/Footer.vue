

<template>
  <footer id="bobafet">
    <p>
      <a href="https://www.youtube.com/watch?v=oszhW4gaI7k">Contactanos</a> |
      <!--<a href="https://www.youtube.com/watch?v=oszhW4gaI7k">Contactanos</a> | <a href="/reglas.html">Reglas</a> | --><a
        href="/reglas.html"
        >Reglas</a
      >
      | <a href="https://github.com/Anoringa">Pagina del proyecto</a> |
      <a href="/reportar">Reportar</a> |
      <a href="/perfil">Configuracion</a> |
      <a href="/politicas.html">Politica de privacidad</a>
    </p>
    <p>&copy;2021 Copyright</p>
  </footer>

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
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
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
  data() {
    return {
      photodefault: "https://picsum.photos/200?random=1",
      postlink: "/post/" + this.id,
    };
  },
  name: "Footer",
  mounted() {
    /*
            window.EventHandler.listen('remove-dialog-' + this.id + '-called', (data) => {
                window.location.reload(true);
                console.log(data);
            });*/
  },
  methods: {
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
$dark: #555;

#bobafet {
  text-align: center;
  padding: 15px 0 100px;

  @include dynamic-theme() {
    border-top: 1px solid theme($border-color);
    background-color: theme($background-color);
  }
}
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 200px;
  width: 200px;
  margin: 1rem;
  position: relative;
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

.thumb-title {
  text-transform: uppercase;
  padding: 10px;
  word-wrap: break-word;
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
</style>