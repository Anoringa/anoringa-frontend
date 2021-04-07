<template>
  <section>
    <div class="editor" />
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
    var ColorClass = Quill.import("attributors/class/color");
    var SizeStyle = Quill.import("attributors/style/size");
    Quill.register(BackgroundClass, true);
    Quill.register(ColorClass, true);
    Quill.register(SizeStyle, true);

    //https://stackoverflow.com/questions/59602182/quill-add-image-url-instead-of-uploading-it
    //add the toolbar options
    var myToolbar = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
      ["link"],
      ["video"],
      ["image"], //add image here
    ];
    function imageHandler() {
      var range = this.quill.getSelection();
      var value = prompt("copie y pegue la URL de la imagen aquí.");
      if (value) {
        this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
      }
    }
    function videoHandler() {
      let url = prompt("Enter Video URL: ");
      url = getVideoUrl(url);
      let range = this.quill.getSelection();
      if (url != null) {
        this.quill.insertEmbed(range, "video", url);
      }
    }

    function getVideoUrl(url) {
        let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
            url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/) ||
            url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=).*/);
        console.log(match[2]);
        if (match && match[2].length === 11) {
            return ('https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
        }
        if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) { // eslint-disable-line no-cond-assign
            return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
        }
        return null;
    }


    

    this.editor = new Quill(this.$el.querySelector(".editor"), {
      modules: {
        toolbar: {
          container: myToolbar,
          handlers: {
            image: imageHandler,
            video: videoHandler,
          },
        },
      },
      placeholder: "Escribe aqui...",
      theme: "snow",
    });

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
  },
  watch: {
    checkbox: function () {
      // Emit this information to the parents component
      this.$emit("child-checkbox", this.htmlContent);
    },
  },
};
</script>
<style>
.ql-container {
  font-size: 1rem;
}
</style>
