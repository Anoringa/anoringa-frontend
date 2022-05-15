<template>
  <div id="darktoggler">
      <input type="checkbox" class="checkbox" id="checkbox" 
      @click="toggleDarkMode"
      :checked="isDarkMode"/>
      <label for="checkbox" class="label">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
        <div class="ball"></div>
      </label>
    </div>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

export default {
  name: "DarkModeSwitch",
  components: {
    //History
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode(event) {
      window.localStorage.setItem("darkMode", event.target.checked);

      const changeEvent = new Event("toggleDarkMode");
      dispatchEvent(changeEvent);
    },
  },

  mounted() {
    const checkbox = document.querySelector("#checkbox");
    checkbox.addEventListener("change", () => {
      // change the theme of the website
      document.body.classList.toggle("dark");
    });

    const oldStateString = window.localStorage.getItem("darkMode");

    this.isDarkMode = oldStateString === "true";
  },
  created() {},
};
</script>

<style scoped>

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");


#darktoggler{
    padding: auto;
}
/*
* {
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  transition: background 0.2s linear;
}
body.dark {
  background-color: #292c35;
}

body.dark p {
  color: #fff;
}
*/

.checkbox {
  opacity: 0;
  position: absolute;
}

.label {
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 50px;
  position: relative;
  height: 26px;
  width: 50px;
}

.ball {
  background-color: #fff;
  position: absolute;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  height: 22px;
  width: 22px;
  transition: transform 0.2s linear;
}

.checkbox:checked + .label .ball {
  transform: translatex(24px);
}

.fa-moon {
  color: #f1c40f;
}

.fa-sun {
  color: #f39c12;
}
</style>
