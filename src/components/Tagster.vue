<template id="sqajklfdn12">
  <input name="tags-readonly-mix" readonly :value="value" />
</template>

<script>
import Tagify from "@yaireo/tagify/dist/tagify.min.js";


/*
import "@yaireo/tagify/dist/tagify.css";
*/

export default {
  name: "ViewTags",
  props: {
    value: [String, Array],
  },
  data() {
    return {
      thisvalue: "a,b,c", //"a,b,c",
      //https://codepen.io/lukaneco/pen/JjrdZeV?editors=0010
      tagifySettings: {
        idfield: "asdasdasdasasaasd1",
        id: "asdasdasdasasaasd",
        pattern: /^.{0,20}$/, // Validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
        delimiters: ",", // ",| " add new tags when a comma or a space character is entered
        dropdown: {
          enabled: 1, // show suggestion after 1 typed character
          fuzzySearch: false, // match only suggestions that starts with the typed characters
          position: "text", // position suggestions list next to typed text
          caseSensitive: true, // allow adding duplicate items if their case is different
        },
        //transformTag: this.transformTag(),
        transformTag: function (tagData) {
          function getRandomColor() {
            function rand(min, max) {
              return min + Math.random() * (max - min);
            }

            var h = rand(1, 360) | 0,
              s = rand(40, 70) | 0,
              l = rand(65, 72) | 0;

            return "hsl(" + h + "," + s + "%," + l + "%)";
          }

          tagData.style = "--tag-bg:" + getRandomColor();

          if (tagData.value.toLowerCase() == "shit") tagData.value = "s✲✲t";
          if (tagData.value.toLowerCase() == "porn") tagData.value = "p✲✲n";
          if (tagData.value.toLowerCase() == "porno") tagData.value = "p✲✲✲o";
          if (
            tagData.value.toLowerCase() == "sexo" ||
            tagData.value.toLowerCase() == "s3x0" ||
            tagData.value.toLowerCase() == "s3xo"
          )
            tagData.value = "s✲✲o";
        },
        blacklist: ["virgen", "inutil"],
        editTags: false,
        callbacks: {
          add(e) {
            console.log("tag added:", e.detail);
            //updateValue(e);
          },
        },
        //pattern: /^.{0,20}$/, // Validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
        templates: {
          dropdownItemNoMatch: function (data) {
            return `<div class='${this.settings.classNames.dropdownItem}' tabindex="0" role="option">
                    No suggestion found for: <strong>${data.value}</strong>
                </div>`;
          },
        },
      },

      suggestions: [],
    };
  },
  watch: {
    value(newVal, oldVal) {
      this.tagify.loadOriginalValues(newVal);
      console.log("newVal", newVal,oldVal);
    },
  },
  mounted() {
    var input = document.querySelector("input[name=tags-readonly-mix]");
    this.tagify = new Tagify(input, this.tagifySettings);
  },
  methods: {
    // generate a random color (in HSL format, which I like to use)
    getRandomColor: function () {
      function rand(min, max) {
        return min + Math.random() * (max - min);
      }

      var h = rand(1, 360) | 0,
        s = rand(40, 70) | 0,
        l = rand(65, 72) | 0;

      return "hsl(" + h + "," + s + "%," + l + "%)";
    },

    transformTag(tagData) {
      tagData.style = "--tag-bg:" + this.getRandomColor();

      if (tagData.value.toLowerCase() == "shit") tagData.value = "s✲✲t";
    },
  },
};
</script>


<style scoped>
@import "../../node_modules/@yaireo/tagify/dist/tagify.css";
.tagify[readonly]:not(.tagify--mix):not(.tagify--select) .tagify__tag > div::before {
box-shadow: inherit!important;
}
</style>
