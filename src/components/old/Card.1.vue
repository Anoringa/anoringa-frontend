<template>

    <span :id="id" class="clickAble" :class="cssClasses" v-text="label" @click="clicked()"></span>
</template>


<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            cssClasses: {
                type: String,
                required: false
            },
            photo: {
                type: String,
                required: false
            }
        },
        mounted() {
          /*
            window.EventHandler.listen('remove-dialog-' + this.id + '-called', (data) => {
                window.location.reload(true);
                console.log(data);
            });*/
        },
        methods: {
            clicked() {
              /*
                window.EventHandler.fire('top-confirm', {
                    id: 'remove-dialog-' + this.id,
                    message: this.message,
                    url: this.url
                });
                */
            }
        }
    };
</script>