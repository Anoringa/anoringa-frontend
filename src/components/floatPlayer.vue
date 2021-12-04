<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky>
    <b-navbar-brand class="container-fluid">
      <div class="player--actions">
        <b-button-group>
          <b-button
            variant="primary"
            @click="(playing = !playing), player.togglePlay()"
            ><b-icon :icon="playing ? 'play-circle-fill' : 'pause-circle-fill'"
          /></b-button>

          <b-button variant="primary" v-b-toggle.my-collapse
            ><b-icon icon="info-circle-fill"
          /></b-button>
        </b-button-group>

        <b-collapse id="my-collapse">
          <div class="music-meta-data">
            <h5 class="title">Song Name</h5>
            <p id="duration" class="duration" />
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
    togglePlayGG: function () {
      //(playing = !playing), player.togglePlay()
      this.player.togglePlay();
      if (this.player.playing == true) {
        this.playing = 1;
      } else {
        this.playing = 0;
      }
    },
    videoTimeUpdated: function () {
      this.duracion = this.player.currentTime;
      // this if statement doesn't seem to do anything
      /*
      if (this.player.currentTime > 105) {
        this.player.stop();
      }*/
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
    //const player = new Plyr("#player");

    this.player = new Plyr("#player", this.options);
    /*
    this.player.on("ready", function () {
      this.player.currentTime = 20;
      this.player.muted = true;
      this.player.muted = false;
      this.player.play();
    });
    */
    this.player.on("timeupdate", function (e) {
      //console.log("this.player.currentTime");
      //console.log(e.detail.plyr.duration);
      //console.log(e.detail.plyr.currentTime);
      this.currentmoment = e.detail.plyr.currentTime;
      this.usernameValue = e.detail.plyr.currentTime;
      document.getElementById("duration").innerHTML =
        moment.utc(e.detail.plyr.currentTime * 1000).format("HH:mm:ss") +
        " de " +
        moment.utc(e.detail.plyr.duration * 1000).format("HH:mm:ss");
      // moment.utc(e.detail.plyr.duration*1000).format('HH:mm:ss');
      //currentTime
      //duration
    });
    this.player.on("ready", () => {
      console.log("this.player.play");
      this.player.play();
      this.currentmoment = 0;
      this.playing = false;
    });
    // https://github.com/sampotts/plyr
    this.player.on("pause", function (e) {
      //console.log("this.player.currentTime");
      //console.log(e.detail.plyr.duration);
      console.log(e);

      const formatted = moment
        .utc(e.detail.plyr.currentTime * 1000)
        .format("HH:mm:ss");
      console.log(formatted);

      //document.getElementById("duration").innerHTML = e.detail.plyr.currentTime / e.detail.plyr.duration;
      //currentTime
      //duration
    });
    /*

    this.player.on("ready", () => {
      console.log("this.player.play");
      this.player.play();
      this.currentmoment = 0;
      this.playing = false;
    });
*/
    //this.videoSearch();
    /*
    // Bind event listener
    function on(selector, type, callback) {
      document.querySelector(selector).addEventListener(type, callback, false);
    }

    on(".js-pause", "click", () => {
      this.player.pause();
      console.log("player.CurrentPosition");
      console.log(this.player.currentTime);
      console.log(this.player.download);
    });
    
    document.querySelector("#test2").addEventListener("click", function () {
      alert("HOVER2");
    });

    const icon = document.querySelector(".icon");

    icon.addEventListener("click", () => {
      icon.classList.toggle("close");
      nav.classList.toggle("show");
    });


       document.querySelector(".float-text").addEventListener("click", function () {
      document.querySelector(".icon").classList.toggle("close");
      document.querySelector(".icon").classList.toggle("show");
    });
    */
    /*
    const touchButton = document.querySelector(".float-text");
    const card = document.querySelector(".float-card-info");
    const close = document.querySelector(".gg-close-r");

    touchButton.addEventListener("click", moveCard);
    close.addEventListener("click", moveCard);

    function moveCard() {
      card.classList.toggle("active");
    }

    // Bind event listener
    function on(selector, type, callback) {
      document.querySelector(selector).addEventListener(type, callback, false);
    }

    // Play
    on(".js-play", "click", () => {
      this.player.play();
      console.log("player.play");
    });
    on(".js-play1", "click", () => {
      this.player.togglePlay();
      console.log("player.play");
    });

    // Pause
    on(".js-pause", "click", () => {
      this.player.pause();
      console.log("player.CurrentPosition");
      console.log(this.player.currentTime);
      console.log(this.player.download);
    });
*/
    /*

    // Stop
    on(".js-stop", "click", () => {
      player.stop();
    });

    // Rewind
    on(".js-rewind", "click", () => {
      player.rewind();
    });

    // Forward
    on(".js-forward", "click", () => {
      player.forward();
    });
    */
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
    font-size: 10px;
  }

  .duration {
    margin: 0;
    font-size: 12px;
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
}
</style>