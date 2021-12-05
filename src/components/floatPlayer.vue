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

          <b-button variant="primary" v-b-toggle.my-collapse
            ><b-icon icon="info-circle-fill"
          /></b-button>
        </b-button-group>

        <b-collapse id="my-collapse">
          <div class="music-meta-data">
            <span class="title">Song Name</span>
            <span id="duration" class="duration">{{ timeLabel }}</span>
          </div>
        </b-collapse>
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
  const currentTime = moment(current * 1000).format("HH:mm:ss");
  const finalTime = moment(final * 1000).format("HH:mm:ss");

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
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "airplay",
          "pip",
          "fullscreen",
        ],
        quality: { options: [2160, 1440, 1080, 720, 576, 480, 360, 240] },
      },
    };
  },

  methods: {
    videoTimeUpdated: function () {
      this.duracion = this.player.currentTime;
      // this if statement doesn't seem to do anything
      /*
      if (this.player.currentTime > 105) {
        this.player.stop();
      }*/
    },
    goForward: function () {
      this.player.play();
      this.player.rewind(10);
      if (!this.playing) this.player.pause();
    },
    goBackward: function () {
      this.player.play();
      this.player.rewind(-10);
      if (!this.playing) this.player.pause();
    },
    toggleMetadata: function () {
      this.playing = !this.playing;

      this.player.togglePlay();
    },
    nowPlaying: function (event) {
      console.log(event);
    },
    playerReady() {
      this.player.currentTime = 95;
      console.log("player ready");
    },
  },
  mounted() {
    this.player = new Plyr("#player", this.options);

    setInterval(() => {
      this.time = {
        current: this.player.currentTime,
        final: this.player.duration,
      };

      const newTimeLabel = generateTimeLabel(this.time);

      if (this.timeLabel !== newTimeLabel) {
        this.timeLabel = newTimeLabel;

        document.getElementById("duration").innerHTML = this.timeLabel;
      }
    }, 1000);

    this.player.on("ready", () => {
      console.log("this.player.play");
      this.player.play();
      this.currentmoment = 0;
      this.playing = true;
    });

    // https://github.com/sampotts/plyr
    this.player.on("pause", function (e) {
      const formatted = moment
        .utc(e.detail.plyr.currentTime * 1000)
        .format("HH:mm:ss");
      console.log(formatted);
    });
  },
};
</script>

<style lang="scss">
.fixed-box {
  position: fixed;
  z-index: 300;
}

.butoncito {
  background-color: white !important;
}
.butoncito:hover {
  background-color: blue !important;
}

.music-meta-data {
  width: 100%;
  display: inline-block;
  position: relative;

  .title {
    margin: 0;
    font-size: 12px;
    display: block;
  }

  .duration {
    margin: 0;
    font-size: 10px;
    display: block;
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
</style>