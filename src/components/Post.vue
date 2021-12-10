<template>
  <main class="maindiv">
    <div v-if="loaded_correctly === 'OK'">
      <!--
      Post id : {{ $route.params.id }}
      -->

      <Header :appName="appName">
        <p v-if="usernameValue == userowner.username">Editar</p>
      </Header>

      <floatPlayer
        v-if="music"
        :idyoutube="music || 'gTFeDTVwUHM'"
      ></floatPlayer>

      <div class="container-fluid">
        <b-row class="mb-12">
          <b-col lg="6" class="post-column">
            <div>
              <img
                :src="photo ? photo : photodefault"
                class="img-fluid post-img"
                alt="aca iria una foto pero nose donde esta"
              />
            </div>

            <h2 class="p-3" style="text-align: left">
              {{ pagetitle }}
            </h2>

            <div class="pb-3">
              <div id="quill-container" class="quill-pre"></div>
            </div>

            <div class="postOwnership text-center">
              <a class="pr-1" :href="'/post/' + id">@{{ id }}</a
              >por {{ userowner.username }}
            </div>

            <p class="last-updated text-center">
              Publicado
              {{
                moment(new Date(postcreatedAt)).format(
                  "DD/MM/YYYY [&nbsp;] HH:mm"
                )
              }}.
            </p>
          </b-col>
          <b-col lg="6">
            <h2 class="p-2 text-center">Comentarios</h2>
            <div style="width: 100%">
              <form class="pt-3">
                <div class="row">
                  <div class="form-group pl-3 pt-3">
                    <!--
                    <label class="typo__label">Responder a...</label>
                    -->
                    <multiselect
                      v-if="value.length >= 1"
                      v-model="value"
                      :options="comments"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      selectLabel="Seleccionar"
                      deselectLabel="Deseleccionar"
                      placeholder=""
                      label="text"
                      track-by="_id"
                      :preselect-first="false"
                      @input="onChange"
                      @change="onChange"
                      no-result="Oops! No list items."
                      :custom-label="customLabel"
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, isOpen }"
                      >
                        <span
                          class="multiselect__single"
                          v-if="values.length &amp;&amp; !isOpen"
                        >
                          <div v-if="values.length > 1">
                            respondiendo a {{ values.length }} comentarios
                          </div>
                          <div v-else>
                            respondiendo a {{ values.length }} comentario
                          </div>
                        </span>
                      </template>
                      <template slot="element" slot-scope="selected">
                        <div class="option__desc">
                          <span class="option__title">{{
                            recortarTextoAdiez(props.option.text)
                          }}</span>
                          <br />
                          <small>{{ selected.option._id }}</small>
                        </div>
                      </template>

                      <template slot="noResult">
                        no hay comentarios papu
                      </template>

                      <template slot="option" slot-scope="props">
                        <div class="option__desc">
                          <span class="option__title">{{
                            recortarTextoAdiez(props.option.text)
                          }}</span>
                          <br />
                          <small>{{ props.option._id }}</small>
                        </div>
                      </template>
                    </multiselect>
                    <!--
                    <p>{{ value }}</p>
                    <pre class="language-json"><code>{{ value  }}</code></pre>
                    -->
                  </div>
                  <!--
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      id="nuevoComentario"
                      placeholder="En respuesta de..."
                      name="email"
                    />
                  </div>
                  -->
                  <!--
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      name="pswd"
                    />
                  </div>-->
                </div>
              </form>
              <div class="form-group pt-3 cumBucket">
                <div class="comment-box-creator">
                  <div class="loader">
                    <b-spinner
                      v-if="!isEditorLoaded"
                      variant="primary"
                      key="primary"
                    ></b-spinner>
                  </div>

                  <div :class="!isEditorLoaded ? 'hidden' : ''">
                    <div id="toolbar-wrapper" class="toolbar--wrapper">
                      <span class="ql-formats">
                        <button class="ql-link"></button>
                        <button class="ql-image"></button>
                        <button class="ql-video"></button>
                        <button class="ql-code-block"></button>
                      </span>
                      <span class="ql-formats">
                        <button class="ql-clean"></button>
                      </span>
                    </div>

                    <div id="editor-wrapper" class="editor--wrapper"></div>

                    <div
                      class="
                        d-flex
                        justify-content-between
                        comment-creator-footer
                      "
                    >
                      <div>
                        <b-form-valid-feedback
                          v-if="commentContentState"
                          :state="commentContentState"
                          class="d-inline-block"
                        >
                          Comenta libremente lo que
                          <strong id="pepegrillo">quieras</strong>!

                          <b-popover
                            :target="'pepegrillo'"
                            triggers="hover"
                            placement="bottom"
                          >
                            <template #title>Ten en cuenta</template>

                            <medium
                              >Lo que <strong>quieras</strong> siempre y cuando
                              siga las normas comunitarias, terminos y
                              condiciones! ☭☭
                            </medium>
                          </b-popover>
                        </b-form-valid-feedback>

                        <b-form-invalid-feedback :state="commentContentState">
                          El comentario no puede estar vacio!
                        </b-form-invalid-feedback>
                      </div>

                      <b-button
                        v-b-modal.modal-1
                        @click="crearComentario"
                        variant="primary"
                        class="comment-button"
                      >
                        Comentar
                      </b-button>
                    </div>
                  </div>
                </div>

                <div id="comentarios" class="pt-3"></div>
                <div v-if="comments !== null" class="comments--wrapper">
                  <div
                    class="repo container"
                    style="text-align: left"
                    v-for="currentComent in orderBy(comments, 'updatedAt', -1)"
                    :id="currentComent._id"
                    :key="currentComent._id"
                  >
                    <div
                      class="comment_owner"
                      style="word-wrap: break-word; white-space: pre-wrap"
                    >
                      <a class="pr-1" :href="'#' + currentComent._id"
                        >@{{ abreviate(currentComent._id) }}</a
                      >
                      por
                      <div
                        style="display: inline"
                        :class="
                          compare(
                            currentComent.user[0].username,
                            userowner.username
                          )
                            ? 'comment_in_response'
                            : 'comment'
                        "
                      >
                        {{ currentComent.user[0].username }}
                      </div>
                      <!--
                      <div
                        v-bind:style="[currentComent.user[0].username == userowner.username ? 'color: red;': 'color: white;','color: white;']"
                        >por {{ currentComent.user[0].username }}</div
                      >-->
                      <a
                        v-if="
                          currentComent.user[0].username == userowner.username
                        "
                        >👃</a
                      >
                      <!-- 
                      <a v-text="currentComent.inResponseTo"></a>
                      
                        -->
                      <a v-if="currentComent.inResponseTo.length">
                        en respuesta de
                        <a
                          class="pl-1 pr-1"
                          style="text-align: left; color: orange"
                          v-for="currentComentchild in currentComent.inResponseTo"
                          :id="
                            'popover-target-' +
                            currentComent._id +
                            '-' +
                            currentComentchild
                          "
                          :key="currentComentchild"
                          :href="'#' + currentComentchild"
                          >@{{ abreviate(currentComentchild) }}

                          <b-popover
                            :target="
                              'popover-target-' +
                              currentComent._id +
                              '-' +
                              currentComentchild
                            "
                            triggers="hover"
                            placement="top"
                            :set="
                              (item = getValueOfArray(
                                comments,
                                currentComentchild
                              ))
                            "
                          >
                            <template #title
                              >🏷️ {{ currentComentchild }}</template
                            >
                            <div v-if="item.text">
                              {{ item.text }}
                              <br /><small
                                ><i>por {{ item.user[0].username }}</i></small
                              >
                            </div>
                            <div v-else>El Comentario no existe</div>
                          </b-popover>
                        </a>
                      </a>
                    </div>
                    <!-- 
                    <p
                      class=""
                      style="word-wrap: break-word; white-space: pre-wrap"
                    >
                      {{ currentComent.text }}
                    </p>
                      
                        -->

                    <div class="quill-pre ql-container ql-snow ql-disabled">
                      <div
                        v-html="currentComent.text"
                        class="commentRichTextViewer ql-editor ql-blank"
                      ></div>
                    </div>
                    <b-button
                      pill
                      variant="link topright"
                      :id="'popover-target-' + currentComent._id"
                      @click="replyThisComment(currentComent)"
                    >
                      <i class="fa fa-reply" style="font-size: 12px"></i>
                      <!-- 
                        <i style="font-size:24px" class="fa">&#xf112;</i>
                        -->
                    </b-button>

                    <b-popover
                      :target="'popover-target-' + currentComent._id"
                      triggers="hover"
                      placement="top"
                    >
                      <template #title>Responder este comentario!</template>
                      Haz click aqui para responder este comentario de
                      <b>{{ currentComent.user[0].username }}</b
                      >!
                    </b-popover>

                    <p class="last-updated" style="color: red">
                      Publicado {{ currentComent.createdAt | moment }}.
                    </p>
                    <!--
                    <b-button
                      v-if="
                        currentComent.user[0].username == userowner.username
                      "
                      variant="primary"
                      >Modify</b-button
                    >
                    -->
                  </div>

                  <!--
          id: 20949438,
          username: "lukaneco",
          content: "Hola pa, que haces",
          inResponseTo: [],
          created_at: 12312948123
                      
<div class="repo" id="20949439">
  <div class="stats">
    <a class="pr-1" href="#20949439">@20949439</a>POR raul12312 en respuesta de <a class="pl-1 pr-1" href="#20949438">@20949438</a></div><p class="">nada por suerte</p><p class="last-updated">Last updated: 3 weeks ago.</p></div>
                    -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <Footer></Footer>
    </div>
    <div v-else-if="loaded_correctly == false" class="loadOrError" style="">
      <b-spinner
        variant="primary"
        style="width: 4rem; height: 4rem"
      ></b-spinner>
    </div>
    <div v-else-if="loaded_correctly == 'ERROR'" style="">
      ERROR
      <p>no se encontro el post que estas buscando</p>
      <loadingspinner></loadingspinner>
    </div>
  </main>
</template>




<script>
// https://stackoverflow.com/questions/1988349/array-push-if-does-not-exist
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function (comparer) {
  for (var i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }
  return false;
};
// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};
/*
var array = [{ name: "tom", text: "tasty" }];
var element = { name: "tom", text: "tasty" };
array.pushIfNotExist(element, function(e) { 
    return e.name === element.name && e.text === element.text; 
});
*/
//import History from "./History";
//import { mapGetters } from "vuex";
import $ from "jquery";
import Multiselect from "vue-multiselect";
import { EventBus } from "../event-bus";
//Vue.component('multiselect', Multiselect)
import Header from "./Header";
import Footer from "./Footer";
import floatPlayer from "./floatPlayer";
import loadingspinner from "./loadingspinner";
/*
      <div class="repo">
          <div class="stats">en respuesta de @sjdkdj @asdas</div>
      
          <p>just a to-do app that saves data to local storage</p>
      
          <div class="stats" style="display: inline-block;">por lukanco<p class='last-updated pl-5'
                  style="font-style:italic;display: inline-block;FLOAT:RIGHT;">Last updated: 3 weeks
                  ago.</p>
          </div>
      
      </div>
      */
//console.log(comentariosList);
var txt2 = $("<p></p>").text("Text."); // Create text with jQuery
//console.log(txt2);
typeof txt2;
/*
      var txt1 = "<p>Text.</p>";        // Create text with HTML
      var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
      var txt3 = document.createElement("p");
      txt3.innerHTML = "Text.";         // Create text with DOM
      console.log(txt1, txt2, txt3);
      $(".container-fluid").append(txt1, txt2, txt3);   // Append new elements
      $("body").append("<p>Text.</p>")
      */
import moment from "moment";
moment.locale("es");
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
import Vue2Filters from "vue2-filters";

import "quill/dist/quill.snow.css";
import Quill from "quill";

const SizeStyle = Quill.import("attributors/style/size");
Quill.register(SizeStyle, true);

import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

export default {
  created() {
    this.moment = moment;
    this.getPostDetail();
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  } /*
    metaInfo: {
      title: 'My Example App',
      titleTemplate: '%s - Yay!',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
    title: ({ $t }) => $t(this.pagetitle),*/,
  mixins: [Vue2Filters.mixin],
  filters: {
    moment: function (date) {
      //return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      return moment(date).fromNow();
    },
  },
  data() {
    return {
      editor: null,
      id: "",
      nuevoComemtarioTexto: "",
      nuevoComemtarioEnRespuestaDe: [],
      ListaDeIdsDeComentarios: [],
      hasPushedAComment: false,
      isEditorLoaded: false,
      value: [],
      options: [
        { name: "Vue.js", language: "JavaScript" },
        { name: "Adonis", language: "JavaScript" },
        { name: "Rails", language: "Ruby" },
        { name: "Sinatra", language: "Ruby" },
        { name: "Laravel", language: "PHP" },
        { name: "Phoenix", language: "Elixir" },
      ],
      photodefault: "https://picsum.photos/200?random=1",
      appName: "Anoringa",
      userowner: null,
      comentarios: [],
      comentariosList: [
        {
          id: 20949438,
          username: "lukaneco",
          content: "Hola pa, que haces",
          inResponseTo: [],
          created_at: 12312948123,
        },
        {
          id: 20949439,
          username: "raul12312",
          content: "nada por suerte",
          inResponseTo: [20949438],
          created_at: 12312948123,
        },
        {
          id: 20949440,
          username: "raulx",
          content: "aca tmando unos verdes",
          inResponseTo: [20949438, 20949439],
          created_at: 12312948123,
        },
      ],
      postexample: [],
      //endpoint: "http://localhost:3000/api/post",
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post",
      //endpoint: "http://localhost:3000/api/post/" + this.$route.params.id,
      //endpoint: "https://agile-everglades-15507.herokuapp.com/api/post/" + this.$route.params.id,
      endpoint: process.env.VUE_APP_API + "/api/post/" + this.$route.params.id,
      //https://agile-everglades-15507.herokuapp.com/api/post/5fea65d576140b6b2093cdb7
      examplesource: "https://jsonplaceholder.typicode.com/posts/",
      url: "asdasdasd",
      photo: "https://picsum.photos/200?random=1",
      pagetitle: "some title",
      comments: [],
      content: "some scrap contenido",
      loaded_correctly: false,
      postcreatedAt: "",
      ambientmusic: true,
      music: false,
      commentEditor: null,
    };
  } /*
metaInfo() {
        return {
            title: `${this.pagetitle} - Anoringa`,
            meta: [
                { name: 'description', content: 'Mira ' + this.pagetitle + ' en Anoringa'},
                { property: 'og:title', content: this.pagetitle + ' - Anoringa'},
                { property: 'og:site_name', content: "Anoringa" },
                { property: 'og:description', content: this.content.substring(0, 30)+"..."},
                {property: 'og:type', content: 'article'},
                {property: 'og:url', content: 'https://anoringa.netlify.app/post/' + this.id},
                {property: 'og:image', content: 'https://anoringa.netlify.app/'+"/anoringa.png" }    
            ]
        }
    },*/,
  name: "Post",
  components: {
    //History,
    Multiselect,
    Header,
    Footer,
    loadingspinner,
    floatPlayer,
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    comment: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      );
      console.log("New Comentario arrived");
      //  :key="item._id""item._id" "url" "photo" title description
      //this.item = ['<call-dialog-link :id="id" :url="url" :photo="photo" :title="new message socket" message="Are you sure you wish to remove this record?" content="Are you sure you wish to remove this record?" label="Remove" css-classes="alert" ></call-dialog-link>'];
      if (data.post == this.id) {
        console.log("este comentario es para este post");
        data.createdAt = moment().toISOString();
        data.updatedAt = moment().toISOString();
        this.comments.push(data);
      } else {
        console.log("llego un comentario para otro post");
      }
    },
    /*
     */
  },
  updated: function () {
    this.$nextTick(function () {
      console.log("the next thicc");
      var editorId = "quill-container";
      var container = document.getElementById(editorId);
      this.editor = new Quill(container, {
        readOnly: true,
        theme: "snow",
        //tab: 'disabled',
        showIndent: false,
        modules: {
          toolbar: false,
        },
      });
      //this.editor.innerHTML = "lalala";
      this.editor.root.innerHTML = this.content;
    });
  },
  mounted() {
    setTimeout(() => {
      const commentEditorWrapper = document.getElementById("editor-wrapper");

      this.commentEditor = new Quill(commentEditorWrapper, {
        modules: {
          toolbar: {
            container: "#toolbar-wrapper",
            handlers: {
              image: imageHandler,
              video: videoHandler,
            },
          },
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
        readOnly: false,
        placeholder: "Escribe aqui tu comentario...",
        theme: "snow",
      });
      this.commentEditor.on("text-change", () => {
        this.nuevoComemtarioTexto = this.commentEditor.root.innerHTML;
      });

      this.isEditorLoaded = true;

      function videoHandler() {
        let url = prompt("copie y pegue la URL deL video Youtube aquí.");
        url = getVideoUrl(url);
        let range = this.quill.getSelection();
        if (url != null) {
          this.quill.insertEmbed(range.index, "video", url, Quill.sources.USER);
        }
      }
      function getVideoUrl(url) {
        let match =
          url.match(
            /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
          ) ||
          url.match(
            /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
          ) ||
          url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=).*/);
        console.log(match[2]);
        if (match && match[2].length === 11) {
          return (
            "https" + "://www.youtube.com/embed/" + match[2] + "?showinfo=0"
          );
        }
        if (
          (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))
        ) {
          // eslint-disable-line no-cond-assign
          return (
            (match[1] || "https") +
            "://player.vimeo.com/video/" +
            match[2] +
            "/"
          );
        }
        return null;
      }
      function imageHandler() {
        var range = this.quill.getSelection();
        var value = prompt(
          "Copie y Pegue la URL de la imagen aquí (jpg, png, gif, jpeg, etc)"
        );
        if (value) {
          this.quill.insertEmbed(
            range.index,
            "image",
            value,
            Quill.sources.USER
          );
        }
      }

      function applyGoogleKeyboardWorkaround(editor) {
        try {
          if (!editor.applyGoogleKeyboardWorkaround) {
            editor.applyGoogleKeyboardWorkaround = true;
            editor.on("editor-change", (eventName, ...args) => {
              if (eventName === "text-change") {
                // args[0] will be delta
                const ops = args[0].ops;
                const oldSelection = editor.getSelection();
                const oldPos = oldSelection?.index;
                const oldSelectionLength = oldSelection
                  ? oldSelection.length
                  : 0;

                if (
                  ops[0].retain === undefined ||
                  !ops[1] ||
                  !ops[1].insert ||
                  !ops[1].insert ||
                  ops[1].insert !== "\n" ||
                  oldSelectionLength > 0
                ) {
                  return;
                }

                setTimeout(() => {
                  const newPos = editor.getSelection().index;
                  if (newPos === oldPos) {
                    console.log("Change selection bad pos");
                    editor.setSelection(editor.getSelection().index + 1, 0);
                  }
                }, 30);
              }
            });
          }
        } catch {
          console.log("error gboard");
        }
      }
      applyGoogleKeyboardWorkaround(this.commentEditor);

      this.commentEditor.clipboard.addMatcher(
        Node.TEXT_NODE,
        function (node, delta) {
          var regex = /https?:\/\/[^\s]+/g;
          if (typeof node.data !== "string") return;
          var matches = node.data.match(regex);

          if (matches && matches.length > 0) {
            var ops = [];
            var str = node.data;
            matches.forEach(function (match) {
              var split = str.split(match);
              var beforeLink = split.shift();
              ops.push({ insert: beforeLink });
              ops.push({ insert: match, attributes: { link: match } });
              str = split.join(match);
            });
            ops.push({ insert: str });
            delta.ops = ops;
          }

          return delta;
        }
      );
    }, 2000);

    //this.$nextTick(()=>{
    //this.two = "Two"
    //})}
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
    customLabel({ text, _id }) {
      return `${this.recortarTextoAdiez(text)} - ${_id}`;
    },
    recortarTextoAdiez: function (eltexto) {
      //return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      //return moment(date).fromNow();
      return eltexto.substring(0, 20);
    },
    getValueOfArray(thearray, thevalue) {
      //console.log("thearray");
      //console.log(thearray);
      //console.log("thevalue");
      //console.log(thevalue);

      //var result = null;

      var valObj = thearray.filter(function (elem) {
        if (elem._id == String(thevalue)) {
          //console.log("elem");
          //console.log(elem);
          return elem;
        }
      });

      //if (valObj.length > 0) console.log(valObj[0]);

      if (valObj.length) {
        //console.log("valObj[0]");
        //console.log(valObj[0]);
        return valObj[0];
      } else {
        //console.log("nope 💔");
        return { _id: null, text: null, createdAt: null };
        // no prop
      }
    },
    abreviate(content) {
      //https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
      //var newString = content.replace(/[a-z]{3}\/[a-z]{3}/gi, " ");
      //var stringArray = content.split('')
      var newString = content.substring(0, 3) + "..." + content.slice(-5);
      //console.log(newString);
      return newString;
    },
    compare(a, b) {
      var result = a == b;
      //console.log("compare");
      //console.log(result);
      return result;
    },
    replyThisComment(comentario) {
      //console.log("comentario");
      //console.log(comentario);
      this.value.pushIfNotExist(comentario, function (e) {
        return e._id === comentario._id && e.text === comentario.text;
      });

      this.ListaDeIdsDeComentarios = this.value.map(({ _id }) => _id);
      console.log(this.ListaDeIdsDeComentarios);
    },
    isTheOwner(someone) {
      if (someone == this.userowner.username) {
        console.log("is the owner");
        return true;
      } else {
        console.log("is a simple mortal");
        return false;
      }
    },
    onChange(value) {
      this.value = value;
      //console.log("comentarios a los que va a responder");
      //console.log(value);
      this.ListaDeIdsDeComentarios = value.map(({ _id }) => _id);
      console.log(this.ListaDeIdsDeComentarios);
    },
    crearComentario() {
      if (
        localStorage.username != "" &&
        localStorage.username != undefined &&
        localStorage.username != null &&
        localStorage.password != "" &&
        localStorage.password != undefined &&
        localStorage.password != null
      ) {
        if (
          this.nuevoComemtarioTexto != "" &&
          this.nuevoComemtarioTexto != null &&
          this.commentContentState
        ) {
          console.log("this.nuevoComemtarioTexto if true");
          console.log(this.nuevoComemtarioTexto);
          console.log("Comemtario Create");
          var data = {
            username: localStorage.username,
            //password: "req.body.password",
            password: localStorage.password,
            text: this.nuevoComemtarioTexto,
            inResponseTo: this.ListaDeIdsDeComentarios,
            postid: this.$route.params.id,
          };
          this.value = [];
          this.ListaDeIdsDeComentarios = [];
          this.nuevoComemtarioTexto = null;
          this.commentEditor.root.innerHTML = null;
          var self = this;

          this.$socket.emit("comment", data, function (datos) {
            console.log("socket.io emit");
            console.log(datos);
            datos.createdAt = moment().toISOString();
            datos.updatedAt = moment().toISOString();
            datos.user = [
              { username: localStorage.username, _id: localStorage.username },
            ];
            self.comments.push(datos);
          });
        } else {
          console.log("el comentario esta vacio");
          alert("apa\nal parecer te olvidaste de escribir tu comentario");
          //console.log("this.nuevoComemtarioTexto if false");
          console.log(this.nuevoComemtarioTexto);
        }
      } else {
        console.log("logueate hijo de puta");
        alert("logueate hijo de puta");
      }
    },
    postCreate(titulox, contenidox, photox) {
      /*
      {
        "username":"Afoxipeb",
        "password":"JJAsjChPvmwvc2qOcRpMoJnogtv9jcQe",
        "title":"Como ser como one punch man",
        "photo":"somepick",
        "content":"hola mundo este es mi nuevo blog"
      }
      */
      console.log("postCreate");
      var data = {
        title: titulox,
        description: contenidox,
        username: localStorage.username,
        //password: "req.body.password",
        password: localStorage.password,
        photo: photox,
      };
      this.$socket.emit("post", data, function (datos) {
        console.log("socket.io emit");
        console.log(datos);
        //this.$root.$emit("component1"); //like this
        //this.$root.$emit("component1", "datos", datos);
        //this.$root.$emit("sendPostP2P", "datos", datos);
        EventBus.$emit("sendPostP2P", "datos", datos);
        //window.Evento.$emit("sendPostP2P", "datos", datos);
        //this.posts.push(datos);
      });
    },
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
          //console.log(response.data.data);
          //console.log("-----other posts data-------");
          console.log(response.data);
          this.loaded_correctly = "OK";
          this.pagetitle = this.post.title;
          this.content = this.post.description;
          //this.editor = this.post.title;

          //this.editor.root.innerHTML = this.post.description;

          if (this.post.music && this.post.music != "false") {
            this.music = this.post.music;
          }

          if (this.post.comments.le) {
            this.comments = this.post.comments;
          } else {
            this.comments = this.post.comentarios;
          }

          // Photo object vs media
          if (typeof this.post.photo === "object") {
            console.log("the image coms from object");
            this.photo = this.post.photo.content;
          } else if (
            typeof this.post.photo === "string" ||
            this.post.photo instanceof String
          ) {
            console.log("the image coms from string");
            this.photo = this.post.photo;
          } else {
            console.log("anyone know the image coms from ");
            console.log(typeof this.post.photo);
            console.log(this.post.photo);
            this.photo = this.post.photo;
          }
          this.userowner = this.post.user[0];
          this.id = this.post._id;
          this.postcreatedAt = this.post.createdAt;

          document
            .querySelectorAll(".commentRichTextViewer")
            .forEach(function (theDIV) {
              console.log(theDIV);
              /*

                  new Quill(theDIV, {
                    readOnly: true,
                    theme: "snow",
                    //tab: 'disabled',
                    showIndent: false,
                    modules: {
                      toolbar: false,
                    },
                  });
                  //this.editor.innerHTML = "lalala";
                  this.editor.root.innerHTML = this.content;
                  */
            });
        })
        .catch((error) => {
          console.log("-----error-------");
          console.log(error);
          this.loaded = "ERROR";
        });
    },
  },
  computed: {
    commentContentState() {
      const postContent = this.nuevoComemtarioTexto;

      if (this.hasPushedAComment || !postContent) return null;

      if (
        postContent != null &&
        postContent != "<p><br></p>" &&
        postContent != "" &&
        postContent.length >= 1
      ) {
        return true;
      } else if (postContent == "") {
        return null;
      } else {
        return false;
      }
    },

    usernameValue() {
      return this.$store.state.username;
      //return localStorage.username;
    },
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style src="./Post.css"></style>

<style lang="scss" scoped>
.post-column {
  padding-top: 15px;
  border-right: 1px solid $light2-color;
}

.toolbar--wrapper {
  background-color: darken($light-color, 3%);
  border-radius: 4px 4px 0 0;
  border: none;
}

.editor--wrapper {
  background-color: $light-color;
  border-radius: 0;
  border: 1px solid $light1-color;
  border-top: 1px solid $light1-color !important;
  border-width: 1px 0;
}

.comment-box-creator {
  border: 1px solid $light2-color;
  border-radius: 4px;
  transition: opacity 1s ease-in-out;
  min-height: 181px;
  position: relative;
  background-color: $light-color;

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.hidden {
  opacity: 0;
}

.comment-creator-footer {
  background: $light-color;
  border-radius: 0 0 4px 4px;
  border: none;
  padding-left: 10px;

  div:first-child {
    margin: 0;
    vertical-align: sub;
  }
}

.comment-button {
  border-radius: 0 0 4px 0;
  z-index: 1;
}

.comments--wrapper {
  border: 1px solid $light2-color;
  border-radius: 4px;

  &:empty {
    border: none;
  }
}

.repo {
  padding: 1em;
  background-color: $light-color;
  border-bottom: 1px solid $light1-color;
  max-width: initial;

  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
}
</style>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.editor--wrapper .ql-editor {
  min-height: 100px;
}

.cumBucket > .ql-toolbar {
  position: static !important;
}
.quill-wrap {
  max-width: 900px;
  width: 100%;
  margin-top: 20px;
}

.quill-wrap .ql-active {
  border: 1px solid #ccc !important;
  border-radius: 4px;
}
.quill-wrap button,
.quill-wrap .ql-picker {
  margin-right: 2px;
}

.ql-indent-8 {
  padding-left: initial !important;
}
[class^="ql-indent"] {
  padding-left: initial !important;
}
.contenidodelpost img {
  zoom: 2;
  display: block;
  margin: auto;

  height: auto;
  width: 100%;
}

.loadOrError {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.container {
  position: relative;
}
.topright {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  /*
  text-align: center;
  */
}
.maindiv {
  max-width: 70em;
  margin: auto;
  line-height: 1.5em;
  color: black;
  outline: 1px solid $light2-color;
  outline-offset: -1px;
  outline-width: 0 1px;
  min-height: 100vh;
  background-color: $primary-light1-color;
}
.container-fluid {
  background: $primary-light1-color;
}

header {
  background-color: #aaa;
  height: 50px;
}
.LeftMenu {
  background-color: #cca;
  width: 100%;
}
.Content {
  width: 100%;
  background-color: #ccf;
}
.nav {
  list-style: none;
  margin-left: 0;
  margin-bottom: 0;
  padding-left: 0;
}
.nav > li,
.nav > li > a {
  display: inline-block;
  *display: inline;
  zoom: 1;
}
.inline-items {
  margin-top: 0;
}
.inline-items li {
  margin-left: 0;
  border-left: 1px solid black;
  padding-left: 10px;
  padding-right: 10px;
}
.inline-items li:first-child {
  margin-left: 0;
  border: none;
  padding-left: 0;
  padding-right: 10px;
}
.inline-items li:last-child {
  padding-right: 0;
}
/* MEDIA QUERIES */
@media screen and (min-width: 47.5em) {
  /*
  .Middle {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 0;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
  }
  .Content {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 0 0;
    overflow: auto;
  }
  .LeftMenu {
    margin-right: 50%;
    display: block;
  }
  .Content {
    top: 0;
    right: 0;
    width: 50%;
    display: block;
  }
  */
}
/*
@media screen and (min-width: 47.5em) {
  .leftColumn {
    margin-right: 19.5em;
  }
  .rightColumn {
    position: absolute;
    top: 0;
    right: 0;
    width: 18.75em;
  }
} MEDIA QUERIES */
.post-img {
  display: block;
  margin: 0 auto;
}
/*
comments
*/
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap");
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.quill-pre {
  border: 0px;
}
header {
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 4px;
  background-color: #fff;
}
header :first-child,
.repo :first-child {
  margin-top: 0;
}
header :last-child,
.repo :last-child {
  margin-bottom: 0;
}
.repo h3 {
  margin-bottom: 0;
  max-width: initial;
}
.stats,
.last-updated {
  font-size: 0.7em;
  color: #666;
}
.stats {
  text-transform: uppercase;
  font-weight: bold;
}
.postOwnership {
  /*text-transform: uppercase;*/
  font-weight: bold;
  font-size: 0.7em;
  color: #666;
}

.comment_owner {
  font-weight: bold;
  font-size: 0.7em;
  color: #666;
}

.last-updated {
  font-style: italic;
}
header {
  width: 25%;
  float: left;
  text-align: center;
}
header img {
  display: block;
  margin: auto;
  width: 50px;
  height: 50px;
}
section {
  padding-left: 1em;
  float: left;
  /*
  width: 75%;
  */
}
#comentarios {
  text-align: left !important;
}
/*# sourceMappingURL=style.css.map */
</style>
<style lang="css" scoped>
.text-stroke {
  /*
  font-size: 70px;
  */
  color: white;
  margin: 0px;
  padding: 0px;
  font-weight: 200;
  font-style: italic;
  text-shadow: 2px 0px 2px #ec008c, -2px 0px 2px #ec008c, 0px 2px 2px #ec008c,
    0px -2px 2px #ec008c, 0 6px 10px rgba(0, 0, 0, 0.3);
}
</style>


