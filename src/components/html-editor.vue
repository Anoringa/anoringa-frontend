<template>
  <section>
    <div id="scrolling-container">
      <div id="quill-container"></div>
    </div>
    <!--
    <pre>{{ htmlContent || "Nothing yet" }}</pre>
    <h2>Raw Html</h2>
    <pre>{{ htmlContent || "Nothing yet" }}</pre>
    <h2>Formatted Html</h2>
    <pre>{{ formattedHtmlContent || "Nothing yet" }}</pre>
    <h2>Read Only Editor For Output?</h2>
    -->
  </section>
</template>

<script>
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { html as beatifyHtml } from "js-beautify";
import store from "../store";
const SizeStyle = Quill.import("attributors/style/size");
Quill.register(SizeStyle, true);

export default {
  name: "html-editor",

  props: {
    /*
    htmlContent: {
      type: String,
      required: true,
    }*/
  },

  data() {
    return {
      htmlContent: null,
      formattedHtmlContent: null,
      editor: null,
    };
  },
  methods: {},
  fetchData() {
    return this.htmlContent;
  },
  eraseData() {
    this.htmlContent = "";
  },
  mounted() {
    var BackgroundClass = Quill.import("attributors/class/background");
    //var ColorClass = Quill.import("attributors/class/color");
    var SizeStyle = Quill.import("attributors/style/size");
    Quill.register(BackgroundClass, true);
    //Quill.register(ColorClass, true);
    Quill.register(SizeStyle, true);

    var toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      //[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];

    //https://stackoverflow.com/questions/59602182/quill-add-image-url-instead-of-uploading-it
    //add the toolbar options
    var myToolbar = [
      //[{ "header": [1, 2, false] }],

      //[{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ font: [] },{ header: [1, 2, 3, 4, 5, 6, false] },{ align: []},"blockquote", "code-block"],



      ["bold", "italic", "underline", "strike", "link"], // toggled buttons
      ["video", "formula", "image",{ color: ["#F00", "#0F0", "#00F", "#000", "#FFF", "color-picker"] }],
      //{ indent: "-1" }, { indent: "+1" },

      [{ list: "ordered" }, { list: "bullet" },{ script: "sub" }, { script: "super" },{ direction: "rtl" },"clean","fullscreen"],
    ];
    function imageHandler() {
      var range = this.quill.getSelection();
      var value = prompt("copie y pegue la URL de la imagen aquí.");
      if (value) {
        this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
      }
    }
    function videoHandler() {
      let url = prompt("copie y pegue la URL deL video Youtube aquí.");
      url = getVideoUrl(url);
      let range = this.quill.getSelection();
      if (url != null) {
        this.quill.insertEmbed(range.index, "video", url, Quill.sources.USER);
      }
    }
    function showColorPicker(value) {
      if (value === "color-picker") {
        var picker = document.getElementById("color-picker");
        if (!picker) {
          picker = document.createElement("input");
          picker.id = "color-picker";
          picker.type = "color";
          picker.style.display = "none";
          picker.value = "#FF0000";
          document.body.appendChild(picker);
          let that = this;

          picker.addEventListener(
            "change",
            function () {
              that.quill.format("color", picker.value);
              console.log(picker.value);
            },false
          );
        }
        picker.click();
      } else {
        this.quill.format("color", value);
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
        return "https" + "://www.youtube.com/embed/" + match[2] + "?showinfo=0";
      }
      if (
        (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))
      ) {
        // eslint-disable-line no-cond-assign
        return (
          (match[1] || "https") + "://player.vimeo.com/video/" + match[2] + "/"
        );
      }
      return null;
    }
    console.log(toolbarOptions);
    this.editor = new Quill(this.$el.querySelector("#quill-container"), {
      modules: {
        toolbar: {
          container: myToolbar,
          handlers: {
            image: imageHandler,
            video: videoHandler,
          },
        },
      },
      scrollingContainer: this.$el.querySelector("#scrolling-container"),
      readOnly: false,

      placeholder: "Escribe aqui...",
      theme: "snow",
    });

    var toolbar = this.editor.getModule("toolbar");
    toolbar.addHandler("color", showColorPicker);

    // this.editor = new Quill(this.$el.querySelector(".editor"), {
    //   modules: {
    //     toolbar: [
    //       [{ header: [1, 2, false] }],
    //       [
    //         "bold",
    //         "italic",
    //         "underline",
    //         { list: "bullet" },
    //         "blockquote",
    //         "size",
    //         "font"
    //       ]
    //     ]
    //   },
    //   placeholder: "Compose an epic...",
    //   theme: "snow" // or 'bubble'
    // });

    this.editor.on("text-change", () => {
      this.htmlContent = this.editor.root.innerHTML;

      store.commit({
        type: "setPostContentText",
        contentText: this.htmlContent,
      });

      this.formattedHtmlContent = beatifyHtml(this.htmlContent, {
        unformatted: [],
      });
    });

    ///https://github.com/quilljs/quill/issues/109
    // Autolink URLs when typing
    /*
    function isWhitespace(ch) {
      var whiteSpace = false;
      if (ch == " " || ch == "\t" || ch == "\n") {
        whiteSpace = true;
      }
      return whiteSpace;
    }

    this.editor.on("text-change", function (delta) {
      var regex = /https?:\/\/[^\s]+$/;
      if (
        delta.ops.length === 2 &&
        delta.ops[0].retain &&
        isWhitespace(delta.ops[1].insert)
      ) {
        var endRetain = delta.ops[0].retain;
        var text = this.editor.getText().substr(0, endRetain);
        var match = text.match(regex);

        if (match !== null) {
          var url = match[0];

          var ops = [];
          if (endRetain > url.length) {
            ops.push({ retain: endRetain - url.length });
          }

          ops = ops.concat([
            { delete: url.length },
            { insert: url, attributes: { link: url } },
          ]);

          this.editor.updateContents({
            ops: ops,
          });
        }
      }
    });
    */
    this.editor.clipboard.addMatcher(Node.TEXT_NODE, function (node, delta) {
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
    });
  },
  watch: {
    checkbox: function () {
      // Emit this information to the parents component
      this.$emit("child-checkbox", this.htmlContent);
    },
  },
};
</script>

<style scoped>
@import "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css";
@import "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css";
</style>
<style>
.ql-container {
  font-size: 1rem;
}

.ql-container.ql-snow {
  height: auto;
  border: 0px;
}
.ql-editor {
  height: 400px;
  overflow-y: scroll;
}
/*
*/

/*
#scrolling-container {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}




.quill-editor {
  margin: 0 auto;
  width: 880px;
  min-height: 500px;
  margin-top: 100px;
}

.quill-editor .ql-editor {
  max-height: 400px;
}

.quill-editor .ql-toolbar.ql-snow,
.quill-editor .ql-container.ql-snow {
  border: none;
}

.quill-editor .ql-toolbar {
  position: fixed;
  z-index: 100;
  background: #ccc;
  top: 0;
}
.ql-toolbar {
  top: 0;
  z-index: 100;
  position: fixed;
  background: #ccc;
}
*/

/* Tell Quill not to scroll 
#quill-container {
  height: auto;
  min-height: 100%;
  padding: 50px;
}*/
#quill-container .ql-editor {
  font-size: 18px;
  overflow-y: visible;
}

/* Specify our own scrolling container */
#scrolling-container {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}

/* MY UPDATES */
.ql-toolbar {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}

/* COLOR PICKER */

.ql-color .ql-picker-options [data-value="color-picker"]:before {
  content: "Pick Color";
}

.ql-color .ql-picker-options [data-value="color-picker"] {
  background: none !important;
  width: 100% !important;
  height: 25px !important;
  text-align: center;
  color: blue;
  text-decoration: underline;
}
</style>
