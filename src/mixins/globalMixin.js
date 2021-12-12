// src/mixins/clickMixin.js
export default {
    methods: {
      clicked(value) {
        alert(value);
      },
      makeToast(append = false, errorTitle, errorMessage, variant) {
        this.toastCount++;
        this.$bvToast.toast(errorMessage, {
          title: errorTitle,
          autoHideDelay: 2500,
          appendToast: append,
          variant: variant, //"warning",
  
          toaster: "b-toaster-bottom-right",
          solid: true,
        });
      },
    },
    computed: {
      DarkModeEnabled() {      
        localStorage.getItem("darkMode") === "true"
      },
    }
  };