<template>
  <a
    :id="id"
    :href="urlEndpoint"
    class="
      col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 col-12
      project-card-wrapper
    "
  >
    <div
      class="col-12 project-card"
      v-bind:style="{
        background:
          'rgb(255, 255, 255) url(' +
          getPhoto(photo) +
          ') no-repeat scroll center / cover',
      }"
    >
      <div class="project-card-content">
        <h4 class="cardtitle">{{ title }}</h4>

        <div class="h-100 d-inline-block pb-3 card-metadata">
          <div v-if="postSort == 'lastComment'">
            <p v-if="lastComment == ['2020-11-30T00:00:00.000Z']"></p>

            <p v-else>
              <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
              Comentado {{ lastCommentDate }}
            </p>
          </div>

          <div v-else-if="postSort == 'countOfComments'">
            <b-icon icon="chat-left-text" aria-hidden="true"></b-icon>
            {{ countOfComments }} comentarios
          </div>

          <div v-else-if="postSort == 'updatedAt'">
            <p>
              <b-icon icon="chat-left-text" aria-hidden="true"></b-icon>
              {{ countOfComments }}

              <b-icon icon="pen" aria-hidden="true"></b-icon>
              por: {{ authorUsername }}
            </p>
          </div>

          <div v-else>
            <b-icon icon="clock" aria-hidden="true"></b-icon>
            {{ lastComment | moment }}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>


<script>
import moment from "moment";

moment.locale("es");

export default {
  name: "Card",
  props: {
    id: {
      type: String,
      required: true,
    },
    urlEndpoint: {
      type: String,
      default: "",
    },
    photo: {
      type: [String, Object],
    },
    title: {
      type: String,
      default: "",
    },
    postSort: {
      type: String,
      default: "",
    },
    lastComment: {
      type: String,
      default: "",
    },
    countOfComments: {
      type: Number,
      default: 0,
    },
    authorUsername: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      photodefault: "https://picsum.photos/200?random=1",
      postlink: "/post/" + this.id,
      lastCommentDate: "",
    };
  },
  created() {
    this.moment = moment;
  },
  mounted() {
    this.lastCommentDate = moment(this.lastComment).fromNow();
  },
  methods: {
    getPhoto(photosonic) {
      function validURL(str) {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator

        return !!pattern.test(str);
      }

      // Photo object vs media
      if (typeof photosonic === "object" || photosonic instanceof Object) {
        //console.log("the image coms from object");
        if (validURL(photosonic.content)) {
          return photosonic.content;
        } else {
          return this.photosonicdefault;
        }
      } else if (
        typeof photosonic === "string" ||
        photosonic instanceof String
      ) {
        //console.log("the image coms from string");
        if (validURL(photosonic)) {
          return photosonic;
        } else {
          return this.photosonicdefault;
        }
      } else {
        console.log("anyone know the image coms from ");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.project-card::before {
  background-image: linear-gradient(
    0deg,
    #000,
    rgba(0, 0, 0, 0.8) 25%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.4) 75%,
    rgba(0, 0, 0, 0.2)
  );
  background-position: center;
  content: "";
  border-radius: 8px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.project-card {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  margin-top: 2%;
  min-width: 12em;
  min-height: 15em;
  border-radius: 8px;
}
.project-card:hover {
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.5), 0 4px 20px 0 rgba(0, 0, 0, 0.49);
}
.project-card-content {
  color: white;
  opacity: 1;
  position: absolute;
  bottom: 0px;
  text-overflow: ellipsis;
}

.project-card-content {
  color: white;
  opacity: 1;
  position: absolute;
  bottom: 0px;
  text-overflow: ellipsis;
}

.cardtitle {
  font-weight: bold;
  @include dynamic-theme() {
    color: theme($card-foreground-color);
  }
}
.card-metadata p {
  @include dynamic-theme() {
    color: theme($card-foreground-color);
  }
}

@media only screen and (min-width: 600px) {
  .project-card-wrapper {
    margin: 0.3% 0%;

    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}

@media only screen and (max-width: 1440px) and (min-width: 1200px) {
  .cardtitle {
    font-weight: initial;
    font-size: 1.3rem;
  }
}
</style>