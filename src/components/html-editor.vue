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
      ["image"], //add image here
    ];
    function imageHandler() {
      var range = this.quill.getSelection();
      var value = prompt("please copy paste the image url here.");
      if (value) {
        this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
      }
    }
    this.editor = new Quill(this.$el.querySelector(".editor"), {
      modules: {
        toolbar: {
          container: myToolbar,
          handlers: {
            image: imageHandler,
          },
        },
      },
      placeholder: "Compose an epic...",
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
