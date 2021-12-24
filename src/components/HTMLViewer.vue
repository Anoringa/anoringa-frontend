<template>
  <div class="text-viewer--wrapper">
    <div class="loader">
      <b-spinner
        v-if="!isEditorLoaded"
        variant="primary"
        key="primary"
      ></b-spinner>
    </div>

    <div :class="!isEditorLoaded ? 'hidden' : ''">
      <div :id="`viewer-wrapper-${id}`" class="viewer--wrapper"></div>
    </div>
  </div>
</template>


<script>
import Quill from "quill";

export default {
  name: "HTMLViewer",
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
      default: "",
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
        `viewer-wrapper-${this.id}`
      );

      this.editor = new Quill(editorWrapper, {
        modules: {
          toolbar: false,
        },
        readOnly: true,
        theme: "snow",
      });

      this.isEditorLoaded = true;
    }, 2000);
  },
  updated() {
    if (this.editor) {
      this.editor.root.innerHTML = this.value;
    }
  },
};
</script>

<style lang="scss" scoped>
.viewer-toolbar--wrapper {
  display: none;
}

.viewer--wrapper {
  @include dynamic-theme() {
    background-color: transparent;
  }

  border-radius: 0;
  border-width: 0;
}

.text-viewer--wrapper {
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out;
  min-height: 181px;
  position: relative;
  padding-top: 1px;

  @include dynamic-theme() {
    background-color: transparent;
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

.hide-toolbar .ql-toolbar {
  display: none;
}
</style>

<style lang="scss">
.viewer--wrapper .ql-editor {
  min-height: 100px;

  &.ql-blank::before {
    @include dynamic-theme() {
      color: theme($placeholder-foreground-color);
    }
  }
}

.quill-pre {
  border: 0px;
}
</style>