<template>
  <div
    class="col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 col-12 card--wrapper"
  >
    <a :id="id" :href="urlEndpoint" class="card--link">
      <img :src="getPhoto(photo)" alt="card-preview" class="card--image" />
      <div class="card--shadow" />

      <div class="card--metadata">
        <h4 class="card--metadata-title">{{ title }}</h4>

        <div class="card--metadata-group">
          <div v-if="postSort == 'lastComment'">
            <span>
              <b-icon icon="plus-circle-fill" aria-hidden="true"></b-icon>
              <span class="group-value">{{ lastCommentedLabel }}</span>
            </span>
          </div>

          <div v-else-if="postSort == 'countOfComments'">
            <span>
              <b-icon icon="chat-left-text" aria-hidden="true"></b-icon>
              <span class="group-value">{{ countOfComments }} comentarios</span>
            </span>
          </div>

          <div v-else-if="postSort == 'updatedAt'" class="updated-group">
            <span>
              <b-icon icon="chat-square-text-fill" aria-hidden="true"></b-icon>
              <span class="group-value">{{ countOfComments }}</span>
            </span>

            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35.9 36"
                height="16"
                class="user-icon"
              >
                <path
                  d="M18 0a18 18 0 1 0 18 18A18 18 0 0 0 18 0Zm0 6c1.51 0 3.36 1.37 3.36 3a7.13 7.13 0 0 1-1.7 3.88 4.37 4.37 0 0 1-.68.68A1.66 1.66 0 0 1 18 14a1.67 1.67 0 0 1-1-.48 4.24 4.24 0 0 1-.67-.67A7.13 7.13 0 0 1 14.64 9c0-1.63 1.85-3 3.36-3Zm0 24c-4 0-8.73-1.15-8.73-4.41 0-2.95 3.19-8.76 6.53-10.89a3 3 0 0 0 4.4 0c3.34 2.13 6.53 7.94 6.53 10.89C26.73 28.85 22 30 18 30Z"
                  fill="currentColor"
                />
              </svg>
              <span class="group-value">{{ authorUsername }}</span>
            </span>
          </div>

          <div v-else>
            <b-icon icon="clock" aria-hidden="true"></b-icon>
            {{ lastComment | moment }}
          </div>
        </div>
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
.card--metadata,
.card--shadow {
  position: absolute;
  width: calc(100% - 16px);
}
.card--shadow {
  $inside-box-shadow: -3px -61px 129px -10px #000000cc inset;

  top: 8px;
  border-radius: 4px;
  height: calc(100% - 16px);

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

.card--metadata {
  bottom: 8px;
  border-radius: 0 0 4px 4px;
  pointer-events: none;
}
.card--metadata-title {
  margin: 0;
  padding: 5px 6px;
  box-sizing: border-box;
  background-color: #00000070;
  border-top: 1px solid #00000020;
  font-size: 20px;
  min-height: 88px;
}
.card--metadata-group {
  height: 30px;
  border-radius: 0 0 4px 4px;
  padding: 0 8px;
  font-size: 12px;

  @include dynamic-theme() {
    background-color: theme($normal-background-color);
    color: theme($foreground-color);
  }

  span {
    margin: 0;
    line-height: 30px;
    vertical-align: middle;
  }
  .group-value {
    margin-left: 3px;
  }

  .updated-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.user-icon {
  display: inline-block;
  margin: 0 2px;
  vertical-align: middle;
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