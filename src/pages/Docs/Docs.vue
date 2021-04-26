<template>
  <div style="margin: 0 auto; width:100%; height:400px;">
    <object type="text/html" data="/politicas.html"
            style="width:100%; height:100%; margin:1%;">
    </object>
</div>
</template>

<script>



export default {
  name: 'Docs',
  metaInfo: {
    title: process.env.VUE_APP_NAME + " | Tutorial de uso",
    meta: [
      {
        vmid: process.env.VUE_APP_NAME + " | Tutorial de uso",
        name: process.env.VUE_APP_NAME + " | Tutorial de uso",
        content: "Anoringa es un sitio en el que podras discutir anonimamente",
      },
      { charset: 'utf-8' },
      { name: 'description', content: 'An example Vue application with vue-meta.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    // override the parent template and just use the above title only
    titleTemplate: false,
    htmlAttrs: {
      lang: "es-AR",
      amp: true,
    },
  },
}
</script>


<style lang="scss" scoped>



</style>