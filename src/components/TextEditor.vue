<template>
  <div class="text-editor--wrapper">
    <div class="loader">
      <b-spinner
        v-if="!isEditorLoaded"
        variant="primary"
        key="primary"
      ></b-spinner>
    </div>

    <div :class="!isEditorLoaded ? 'hidden' : ''">
      <div>
        <div :id="`toolbar-wrapper-${id}`" class="toolbar--wrapper">
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

        <div :id="`editor-wrapper-${id}`" class="editor--wrapper"></div>
      </div>

      <slot></slot>
    </div>
  </div>
</template>


<script>
import Quill from "quill";

export default {
  name: "TextEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Escribe aqui tu comentario...",
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isEditorLoaded: false,
      editor: null,
    };
  },
  mounted() {
    setTimeout(() => {
      const editorWrapper = document.getElementById(
        `editor-wrapper-${this.id}`
      );

      this.editor = new Quill(editorWrapper, {
        modules: {
          toolbar: {
            container: `#toolbar-wrapper-${this.id}`,
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
        placeholder: this.placeholder,
        theme: "snow",
      });
      this.editor.on("text-change", () =>
        this.onChange({ ...event, HTMLText: this.editor.root.innerHTML })
      );

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
      applyGoogleKeyboardWorkaround(this.editor);

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
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.toolbar--wrapper {
  @include dynamic-theme() {
    background-color: darken(theme($normal-background-color), 3%);
  }

  border-radius: 4px 4px 0 0;
  border: none;
}

.editor--wrapper {
  @include dynamic-theme() {
    background-color: theme($normal-background-color);
    border-color: theme($border2-color);
    border-top: 1px solid theme($border2-color) !important;
  }

  border-radius: 0;
  border-width: 1px 0;
  border-style: solid;
}

.text-editor--wrapper {
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out;
  min-height: 181px;
  position: relative;
  padding-top: 1px;

  @include dynamic-theme() {
    background-color: theme($normal-background-color);
    border: 1px solid theme($border-color);
  }

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus-within {
    @include dynamic-theme() {
      border-color: theme($primary-color);
      box-shadow: 0 0 0 0.2rem rgba(theme($primary-color), 60%);
    }
  }
}

.hidden {
  opacity: 0;
}
</style>

<style lang="scss">
.editor--wrapper .ql-editor {
  min-height: 100px;

  &.ql-blank::before {
    @include dynamic-theme() {
      color: theme($placeholder-foreground-color);
    }
  }
}
.toolbar--wrapper {
  @include dynamic-theme() {
    button:hover .ql-stroke,
    button:focus .ql-stroke,
    button:active .ql-stroke {
      stroke: theme($primary-color);
    }

    button:hover .ql-fill,
    button:focus .ql-fill,
    button:active .ql-fill {
      fill: theme($primary-color);
    }

    button:hover .ql-picker,
    button:focus .ql-picker,
    button:active .ql-picker {
      color: theme($primary-color);
    }

    .ql-stroke {
      stroke: theme($foreground1-color);
    }

    .ql-fill {
      fill: theme($foreground1-color);
    }

    .ql-picker {
      color: theme($foreground1-color);
    }
  }
}

.quill-pre {
  border: 0px;
}
</style>