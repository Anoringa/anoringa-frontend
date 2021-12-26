<template>
  <div
    class="col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 col-12 card--wrapper"
  >
    <a :id="id" :href="urlEndpoint" class="card--link">
      <img :src="getPhoto(photo)" alt="card-preview" class="card--image" />
      <div class="card--shadow" />

      <div class="card--metadata">
        <!-- <h1>Text</h1> -->
      </div>

      <!-- <div
        class="project-card"
        v-bind:style="{
          background:
            'rgb(255, 255, 255) url(' +
            getPhoto(photo) +
            ') no-repeat scroll center / cover',
        }"
      >
        <div class="project-card-content">
          <h4 class="cardtitle">{{ title }}</h4>

          <div class="h-100 card-metadata">
            <div v-if="postSort == 'lastComment'">
              <p>
                <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                {{ lastCommentedLabel }}
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
      </div> -->
    </a>
  </div>
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
    };
  },
  created() {
    this.moment = moment;
  },
  computed: {
    lastCommentedLabel: function () {
      const isValidDate = this.lastComment !== "2020-11-30T00:00:00.000Z";
      const dateLabel = isValidDate
        ? moment(this.lastComment).fromNow()
        : "nunca";

      return `Comentado ${dateLabel}`;
    },
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
.card--wrapper {
  height: 240px;
  border-radius: 4px;
  padding: 8px;
  position: relative;
}

.card--image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
}
.card--shadow {
  $inside-box-shadow: -3px -61px 129px -10px #000000cc inset;

  position: absolute;
  top: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  border-radius: 4px;

  box-shadow: 0 0 0 0.2rem #00000020, $inside-box-shadow;
  transition: box-shadow 0.1s;

  @include dynamic-theme() {
    box-shadow: 0 0 0 0.2rem rgba(theme($foreground-color), 8%),
      $inside-box-shadow;
  }

  &:hover {
    @include dynamic-theme() {
      box-shadow: 0 0 0 0.3rem rgba(theme($primary-color), 15%),
        $inside-box-shadow;
    }
  }
  &:active,
  &:focus {
    @include dynamic-theme() {
      box-shadow: 0 0 0 0.4rem rgba(theme($primary-color), 60%),
        $inside-box-shadow;
    }
  }
}

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

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.5),
      0 4px 20px 0 rgba(0, 0, 0, 0.49);
  }
}
.project-card-content {
  color: white;
  opacity: 1;
  position: absolute;
  bottom: 0px;
  left: 0px;
  text-overflow: ellipsis;
  width: 100%;
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
  margin: 0;
  background-color: #ccc;
  width: inherit;

  @include dynamic-theme() {
    color: theme($card-foreground-color);
  }
}

@media only screen and (max-width: 1440px) and (min-width: 1200px) {
  .cardtitle {
    font-weight: initial;
    font-size: 1.3rem;
  }
}
</style>