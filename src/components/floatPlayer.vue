<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky>
    <div id="wrapper" class="video--wrapper">
      <div class="video">
        <div
          id="player"
          data-plyr-provider="youtube"
          :data-plyr-embed-id="idyoutube"
        />
      </div>
    </div>

    <b-navbar-brand class="container-fluid">
      <div class="player--actions m-auto">
        <b-button-group>
          <b-button variant="primary"
            ><b-icon icon="skip-forward-circle-fill" @click="goForward"
          /></b-button>

          <b-button variant="primary" @click="toggleMetadata"
            ><b-icon
              :icon="isPlaying ? 'pause-circle-fill' : 'play-circle-fill'"
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
  </b-navbar>
</template>

<script>
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
  data() {
    return {
      isPlaying: false,
      time: {
        current: 0,
        final: 0,
      },
      timeLabel: "00:00:00 de 00:00:00",
      thumbnail: "",
      title: "",
      player: {},
      options: {
        autoplay: true,
        volume: 0.3,
      },
    };
  },

  methods: {
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
      setTimeout(() => {
        this.thumbnail = `url("${this.player.poster}")`;
        this.title = this.player.config.title;
      }, 1000);
    });

    this.player.on("play", () => {
      playEventId = setInterval(updateDuration, 1000);
      this.isPlaying = true;
    });

    this.player.on("pause", () => {
      clearInterval(playEventId);
      playEventId = null;
      this.isPlaying = false;
    });
  },
};
</script>

<style lang="scss">
.sticky-top {
  z-index: 300 !important;
}

.music-meta-data {
  max-width: 400px;
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

.video--wrapper {
  position: relative;

  .video {
    position: absolute;
    opacity: 0;
    pointer-events: none;
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

    @include dynamic-theme() {
      border: 1px solid theme($light-color);
    }
  }

  &:before {
    content: "";
    position: absolute;
    height: 30%;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    @include dynamic-theme() {
      background-color: theme($dark-color);
      border: 2px solid theme($light-color);
    }
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

@media only screen and (max-width: 600px) {
  .music-meta-data {
    width: 90px;
  }
}
</style>
