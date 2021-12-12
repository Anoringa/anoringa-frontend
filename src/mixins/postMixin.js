/*

https://vuejs.org/v2/guide/mixins.html
https://blog.bitsrc.io/understanding-mixins-in-vue-js-bdcf9e02a7c1
https://blog.logrocket.com/mixins-custom-functions-vue/
*/

import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export default {
    data() {
        return {
          endpoint: process.env.VUE_APP_API + "/api/post/",
        }
    },
    methods: {
        clicked(value) {
            alert(value);
        },
        async getPost(postId) {
            var thisMessage = "we are going to get the post: " + postId
            console.log(thisMessage)
            //return thisMessage;

            return axios
              .get(this.endpoint+postId)
              .then((response) => {
                console.log("response.data.data");
                console.log(response.data.data);
                return response.data.data;
              })
              .catch((error) => {
                console.log("-----error-------");
                console.log(error);
                this.loaded = "ERROR";
                return false;
              });
          },
        updatePost(postId) {
            console.log("we are going to update the post: ", postId)
        },
        postPost(postId) {
            console.log("we are going to publish the post: ", postId)
        }
    }
};