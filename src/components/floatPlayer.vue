<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky>
    <b-navbar-brand class="container-fluid">
      <div class="player--actions">
        <b-button-group>
          <b-button variant="primary"
            ><b-icon icon="skip-forward-circle-fill" @click="goForward"
          /></b-button>

          <b-button variant="primary" @click="toggleMetadata"
            ><b-icon :icon="playing ? 'pause-circle-fill' : 'play-circle-fill'"
          /></b-button>

          <b-button variant="primary"
            ><b-icon icon="skip-backward-circle-fill" @click="goBackward"
          /></b-button>
        </b-button-group>

        <div class="song-cover">
          <img :style="`background-image: ${thumbnail}`" alt="" />
        </div>

        <div class="music-meta-data">
          <span class="title">{{ title }}</span>
          <span id="duration" class="duration">{{ timeLabel }}</span>
        </div>
      </div>
    </b-navbar-brand>

    <div id="wrapper" class="video--wrapper">
      <div class="video">
        <div
          @timeupdate="videoTimeUpdated"
          id="player"
          data-plyr-provider="youtube"
          :data-plyr-embed-id="idyoutube"
        />
      </div>
    </div>
  </b-navbar>
</template>

<script>
import moment from "moment";
moment.locale("es");

import Plyr from "plyr";
import "plyr/dist/plyr.css";

const generateTimeLabel = ({ current, final }) => {
  const [currentTime] = new Date(current * 1000)
    .toUTCString()
    .match(/(\d\d:\d\d:\d\d)/);
  const [finalTime] = new Date(final * 1000)
    .toUTCString()
    .match(/(\d\d:\d\d:\d\d)/);

  return `${currentTime} de ${finalTime}`;
};

export default {
  name: "FloatPlayer",
  props: {
    idyoutube: {
      type: String,
      required: true,
      default: "rQiHzcdUPAU",
    },
  },
  created() {
    this.moment = moment;
  },
  computed: {
    jsonVal() {
      return "this.player";
    },
    usernameValue() {
      return this.currentmoment;
    },
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.currentmoment;
    },
  },
  data() {
    return {
      playvalue: {
        selected: 0,
        icon: ["play", "pause"],
      },
      playing: true,
      iconval: "play",

      time: {
        current: 0,
        final: 0,
      },
      timeLabel: "00:00:00 de 00:00:00",

      thumbnail: "",
      title: "",

      fullName: "Foo Bar",
      currentmoment: "xd",
      duracion: "Foo Bar",
      player: {},
      options: {
        autoplay: true,
        volume: 0.3,
        //captions: { active: true, update: true, language: "auto" },
        controls: [
          /*
          "play",
          "rewind", // Rewind by the seek time (default 10 seconds)
          "fast-forward", // Fast forward by the seek time (default 10 seconds)
          
          "settings",
          */
        ],
        quality: { options: [2160, 1440, 1080, 720, 576, 480, 360, 240] },
      },
    };
  },

  methods: {
    videoTimeUpdated: function () {
      this.duracion = this.player.currentTime;
    },
    goForward: function () {
      this.player.rewind(10);
      this.time = {
        ...this.time,
        current: this.player.currentTime,
      };

      this.timeLabel = generateTimeLabel(this.time);
      document.getElementById("duration").innerHTML = this.timeLabel;
    },
    goBackward: function () {
      this.player.rewind(-10);
      this.time = {
        ...this.time,
        current: this.player.currentTime,
      };
      this.timeLabel = generateTimeLabel(this.time);
      document.getElementById("duration").innerHTML = this.timeLabel;
    },
    toggleMetadata: function () {
      this.playing = !this.playing;

      this.player.togglePlay();
    },
  },
  mounted() {
    this.player = new Plyr("#player", this.options);
    const duration = document.getElementById("duration");

    const updateDuration = () => {
      this.time = {
        current: this.player.currentTime,
        final: this.player.duration,
      };

      const newTimeLabel = generateTimeLabel(this.time);

      if (this.timeLabel !== newTimeLabel) {
        this.timeLabel = newTimeLabel;

        duration.innerHTML = this.timeLabel;
      }
    };

    let playEventId = null;

    this.player.on("ready", () => {
      this.currentmoment = 0;
      this.playing = true;

      setTimeout(() => {
        this.thumbnail = `url("${this.player.poster}")`;
        this.title = this.player.config.title;
        this.player.play();
      }, 1000);
    });

    this.player.on("play", () => {
      playEventId = setInterval(updateDuration, 1000);
    });

    this.player.on("pause", () => {
      clearInterval(playEventId);
      playEventId = null;
    });
  },
};
</script>

<style lang="scss">
.fixed-box {
  position: fixed;
  z-index: 300;
}

.music-meta-data {
  width: 400px;
  display: inline-block;
  position: relative;

  .title {
    margin: 0;
    font-size: 12px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .duration {
    margin: 0;
    font-size: 10px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media only screen and (max-width: 600px) {
  .music-meta-data {
    width: 90px;
  }
}

.video--wrapper {
  position: relative;

  .video {
    position: absolute;
    opacity: 0;
  }
}
.player--actions {
  display: flex;
  gap: 7px;
  height: 48px;
}

.song-cover {
  position: relative;
  display: inline-block;
  vertical-align: top;
  animation: rotation 10s linear infinite;
  margin-right: 7px;

  img {
    width: 48px;
    height: 48px;
    background-size: cover;
    border-radius: 50%;
    background-position: center center;
    border: 1px solid #fff;
  }

  &:before {
    content: "";
    position: absolute;
    height: 40%;
    width: 40%;
    background-color: #333;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid #fff;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>