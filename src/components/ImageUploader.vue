<template>
  <div class="hello">
    <!--
    <h1>Image uploader component</h1>
    <b-tabs content-class="mt-3">
      <b-tab title="URL de Imagen" active>
        <div role="group">
          <b-form-input
            id="input-live"
            v-model="url_de_imagen"
            :state="imagelinkState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter your name"
            debounce="5"
            trim
          ></b-form-input>

          <b-form-invalid-feedback id="input-live-feedback">
            Ingresaq una URL de imagen valida
          </b-form-invalid-feedback>

          <b-form-valid-feedback id="input-live-feedback">
            <b-img
              thumbnail
              fluid
              :src="url_de_imagen"
              alt="Link Image thumbnail"
            ></b-img>
          </b-form-valid-feedback>
        </div>
      </b-tab>
      <b-tab title="Subir Imagen">
        <div>
          <b-form-file
            accept="image/jpeg, image/png, image/gif"
            v-model="file1"
            :state="Boolean(file1)"
            placeholder="Busca un archivo o sueltalo aqui..."
            drop-placeholder="Sueltalo aqui..."
          ></b-form-file>
          <div class="mt-3">
            Imagen Seleccionada: {{ file1 ? file1.name : "" }}
          </div>
        </div>
      </b-tab>
      <b-tab title="Youtube"
        ><div role="group">
          <b-form-input
            id="input-live"
            v-model="youtube_link"
            :state="youtubeState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Ingresa un link de youtube"
            trim
          ></b-form-input>

          <b-form-invalid-feedback id="input-live-feedback">
            Ejemplo :
            https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO
          </b-form-invalid-feedback>

          <b-form-text id="input-live-help"
            >ingresa un link de youtube valido</b-form-text
          >
          <b-form-valid-feedback id="input-live-feedback">
            //https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api

            <b-img
              thumbnail
              fluid
              :src="
                'https://img.youtube.com/vi/' +
                youtube_video_id +
                '/sddefault.jpg'
              "
              alt="Youtube Image thumbnail"
            ></b-img>
          </b-form-valid-feedback>
        </div>
      </b-tab>
      <b-tab title="Gif (tenor)" disabled><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>

            -->
    <div>
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <!--
      <div class="mt-3">
        Selected: <strong>{{ selected }}</strong>
      </div>
      -->

      <div v-if="selected">
        <div v-if="selected.type == 'photo' && selected.source == 'upload'"
              class="pt-3 pb-3">
          <div>
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              v-model="file1"
              :state="Boolean(file1)"
              placeholder="Busca un archivo o sueltalo aqui..."
              drop-placeholder="Sueltalo aqui..."
              @input="selectImageFile()"
            ></b-form-file>
            <img :src="file1" alt="" />
            <!--
            <div class="mt-3">Selected file: {{ file1 ? file1 : "" }}</div>
              @change="readURL(this)"
            <div class="mt-3">
              required="true"
              Imagen Seleccionada: {{ file1 ? file1.name : "" }}
            </div>-->
            <img
              v-if="imagebase64 != false && imagebase64 != ''"
              style=""
              :src="imagebase64"
              alt=""
              width="50%"
              height="auto"
            />
          </div>
        </div>

        <div v-if="selected.type == 'photo' && selected.source == 'url'" class="pt-3 pb-3">
          <div role="group">
            <b-form-input
              id="input-live"
              v-model="url_de_imagen"
              :state="imagelinkState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your name"
              debounce="5"
              @change="setimgurl()"
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              Ingresa una URL de imagen valida
            </b-form-invalid-feedback>

            <!--
            <b-form-text id="input-live-help">link de imagen.</b-form-text>
            <div class="mt-2">link: {{ url_de_imagen }}</div>
            -->

            <b-form-valid-feedback id="input-live-feedback">
              <b-img
                thumbnail
                fluid
                :src="url_de_imagen"
                alt="Link Image thumbnail"
              ></b-img>
            </b-form-valid-feedback>
          </div>
        </div>

        <div v-if="selected.type == 'video' && selected.source == 'youtube'">
          <div role="group">
            <!--
            <label for="input-live">Link:</label>
            -->
            <b-form-input
              id="input-live"
              v-model="youtube_link"
              :state="youtubeState"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Ingresa un link de youtube"
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              ingresa un link de youtube valido Ejemplo :
              https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO
            </b-form-invalid-feedback>
            <!--
            <b-form-text id="input-live-help"
              >ingresa un link de youtube valido</b-form-text
            >-->
            <b-form-valid-feedback id="input-live-feedback">
              <!--
              //https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
-->
              <b-img
                v-if="youtube_video_id != false"
                thumbnail
                fluid
                :src="
                  'https://img.youtube.com/vi/' +
                  youtube_video_id +
                  '/sddefault.jpg'
                "
                alt="Youtube Image thumbnail"
              ></b-img>
            </b-form-valid-feedback>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
function testImage(url, timeoutT) {
  return new Promise(function (resolve, reject) {
    var timeout = timeoutT || 5000;
    var timer,
      img = new Image();
    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      reject("error");
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve("success");
    };
    timer = setTimeout(function () {
      // reset .src to invalid URL so it stops previous
      // loading, but doens't trigger new load
      img.src = "//!!!!/noexist.jpg";
      reject("timeout");
    }, timeout);
    img.src = url;
  });
}

function record(url, result) {
  document.body.innerHTML +=
    "<span class='" + result + "'>" + result + ": " + url + "</span><br>";
}
function runImage(url) {
  testImage(url).then(record.bind(null, url), record.bind(null, url));
}
*/
import store from "../store";

export default {
  computed: {
    nameState() {
      return this.url_de_imagen.length > 2 ? true : false;
    },
    imagelinkState() {
      var str = this.url_de_imagen;
      if (typeof str !== "string") return false;
      return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
    },
    /*
    imagelinkState2() {
      if (this.url_de_imagen.length > 2) {
        //this.checkIfImageWorks(this.url_de_imagen);
        //return true;
        this.checkIfImageWorks(this.url_de_imagen);
        return this.url_de_imagen_ok;
      } else {
        return false;
      }
    },*/
    youtubeState() {
      var url = this.youtube_link;
      console.log(url);
      var videoId = "";
      var urlParts = null;

      if (url.indexOf("youtube") !== -1) {
        urlParts = url.split("?v=");
        videoId = urlParts[1].substring(0, 11);
      } else if (url.indexOf("youtu.be") !== -1) {
        urlParts = url.replace("//", "").split("/");
        videoId = urlParts[1].substring(0, 11);
      }
      if (videoId === "") {
        console.log("Could not extract video id. Seems invalid url");
        //this.youtube_video_id = false;
        //this.youtube_thumbnail = false;
        this.setYoutubeVideoID(false, true);
        return false;
      } else {
        console.log("Video Id is: " + videoId);

        this.setYoutubeVideoID(videoId, true);

        //this.youtube_video_id = videoId;
        //this.youtube_thumbnail = true;
        return true;
      }

      //return this.name.length > 2 ? true : false;
    },
  },
  name: "ImageUploader",
  methods: {
    setimgurl(){
      var imagelinkasd = this.url_de_imagen
      console.log("this.url_de_imagen");
      console.log(this.url_de_imagen);
      this.setImageSource({value:{ type: 'photo', source: 'url' },content:imagelinkasd})
    },
    setImageSource(data){
      console.log("the media of the post has been setted")
      console.log(data)
      console.log("💥")

      store.commit({
        type: "setPostImage",
        content: data.content,
        value: {type:data.value.type,source:data.value.source}
      });

    },
    selectImageFile() {
      console.log("file1");
      console.log(this.file1);
      this.createBase64Image(this.file1);
      //console.log(this.file1);
      
    },
    saveImage(url) {
      store.commit({
        type: "setPostPhotoLink",
        link: url,
      });
    },
    handleImage() {
      console.log("file1");
      console.log(this.file1);
      //const selectedImage = e.target.files[0]; // get first file
      //this.createBase64Image(this.file1);
      //this.imagebase64 = this.file1
      var fileObject = this.file1;
      const reader = new FileReader();
      reader.onload = (fileObject) => {
        this.imagebase64 = fileObject;
        console.log("this.image");
        console.log(this.imagebase64);
        //this.uploadImage();
        //this.image = this.uploadImageImgur(this.imagebase64);
      };
      reader.readAsDataURL(fileObject);
    },
    
    
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagebase64 = e.target.result;
        console.log("this.image");
        console.log(this.imagebase64);
        //this.uploadImage();
        //this.image = this.uploadImageImgur(this.imagebase64);
      this.setImageSource({value:{ type: 'photo', source: 'upload' },content:this.imagebase64})
      };
      reader.readAsDataURL(fileObject);
    },
    setYoutubeVideoID(uno, dos) {
      this.youtube_video_id = uno;
      this.youtube_thumbnail = dos;
    },

    /*
    checkIfImageWorks(url) {
      testImage(url).then(console.log(null, url));
      var reqstate = false;
      var timeout = 10000;
      var timedOut = false,
        timer;

      var finalizo = false;
      var img = new Image();

      img.onerror = img.onabort = function () {
        if (!timedOut) {
          clearTimeout(timer);
          console.log(url, "error");
          //this.url_de_imagen_ok = false;
          reqstate = false;
          //return false;
          finalizo = true;
        }
      };
      img.onload = function () {
        if (!timedOut) {
          clearTimeout(timer);
          console.log(url, "success");
          reqstate = true;
          //return true;
          finalizo = true;
        }
      };
      img.src = url;
      timer = setTimeout(function () {
        timedOut = true;
        console.log(url, "timeout");
        //this.url_de_imagen_ok = false;
        reqstate = false;
        finalizo = true;
        //return false;
      }, timeout);

      if (finalizo) {
        this.url_de_imagen_ok = reqstate;
        console.log("image is", this.url_de_imagen_ok);

        finalizo = false;
      } else {
        console.log("no finalizo");
      }
    },
      */
  },
  data() {
    return {
      imagebase64: "",
      url_de_imagen: "",
      url_de_imagen_ok: false,
      youtube_video_id: null,
      youtube_thumbnail: false,
      youtube_link: "",
      name: "",
      file1: null,
      selected: null,
      options: [
        
        {
          value: { type: "photo", source: "upload" },
          text: "Subir una imagen",
        },
        {
          value: { type: "photo", source: "url" },
          text: "Ingresar direccion URL de una imagen",
          //disabled: true,
        },
        {
          value: { type: "video", source: "youtube" },
          text: "Video de Youtube",
          disabled: true,
        },
        {
          value: { type: "gif", source: "tenor" },
          text: "Buscar un gif",
          disabled: true,
          //https://tenor.com/gifapi/documentation#quickstart-setup
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "Buscar" !important;
}
.custom-file-input:lang(es) ~ .custom-file-label::after {
  content: "Buscar" !important;
}
</style>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
