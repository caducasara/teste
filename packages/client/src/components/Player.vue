<script>
import Heart from "vue-material-design-icons/Heart.vue";
import ImageSizeSelectSmall from "vue-material-design-icons/ImageSizeSelectSmall.vue";
import PlaylistPlay from "vue-material-design-icons/PlaylistPlay.vue";
import DesktopTowerMonitor from "vue-material-design-icons/DesktopTowerMonitor.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";
import Repeat from "vue-material-design-icons/Repeat.vue";
import SkipNext from "vue-material-design-icons/SkipNext.vue";
import PauseCircleOutline from "vue-material-design-icons/PauseCircleOutline.vue";
import PlayCircleOutline from "vue-material-design-icons/PlayCircleOutline.vue";
import SkipPrevious from "vue-material-design-icons/SkipPrevious.vue";
import CompareVertical from "vue-material-design-icons/CompareVertical.vue";
import VueSlider from "vue-slider-component";
import formatDurationForMinutes from "../utils/traslateDurationForMinutes";
import { useStore } from "vuex";
import { ref, watch } from "vue";

export default {
  components: {
    Heart,
    ImageSizeSelectSmall,
    PlaylistPlay,
    DesktopTowerMonitor,
    VolumeMute,
    Repeat,
    SkipNext,
    PauseCircleOutline,
    PlayCircleOutline,
    SkipPrevious,
    CompareVertical,
    VueSlider,
  },
  setup() {
    const store = useStore();
    const { state } = store;
    const progressBar = ref(0);

    const setIsPlaying = () => {
      if (!state.songSelected.id) {
        return;
      }

      store.dispatch("setIsPlaying", !state.isPlaying);
    };

    watch(
      () => state.songPropgress,
      () => {
        const calculateProgressBar = parseInt(
          (state.songPropgress / state.songSelected.duration) * 100
        );

        progressBar.value = calculateProgressBar;
      }
    );

    return {
      formatDurationForMinutes,
      setIsPlaying,
      progressBar,
    };
  },
};
</script>

<template>
  <div class="player">
    <div class="music-infos">
      <div class="music-names">
        <span class="music-name">
          {{ $store.state.songSelected.title }}
        </span>
        <span class="music-artist">
          {{ $store.state.albumSelected.artist }}
        </span>
      </div>
      <div class="music-option">
        <Heart :size="22" />
        <ImageSizeSelectSmall :size="22" />
      </div>
    </div>
    <div class="player-commands">
      <div class="player-functions">
        <CompareVertical :size="22" />
        <SkipPrevious :size="22" />
        <PlayCircleOutline
          id="player-functions-option"
          :size="42"
          v-if="!this.$store.state.isPlaying"
          @click="setIsPlaying()"
        />
        <PauseCircleOutline
          id="player-functions-option"
          :size="42"
          v-if="this.$store.state.isPlaying"
          @click="setIsPlaying()"
        />
        <SkipNext :size="22" />
        <Repeat :size="22" />
      </div>
      <div class="player-progress-bar">
        <span class="music-duration">{{
          formatDurationForMinutes($store.state.songPropgress)
        }}</span>
        <vue-slider
          width="600px"
          v-model="progressBar"
          :process="true"
          :duration="1"
          :clickable="false"
          :tooltip="'none'"
          :dotSize="4"
          :railStyle="{
            backgroundColor: '#404040',
            cursor: 'pointer',
          }"
          :processStyle="{
            backgroundColor: '#b3b3b3',
          }"
        />
        <span class="music-duration">
          {{ formatDurationForMinutes($store.state.songSelected.duration) }}
        </span>
      </div>
    </div>
    <div class="player-options">
      <PlaylistPlay :size="22" />
      <DesktopTowerMonitor :size="22" />
      <VolumeMute :size="22" />
      <input type="range" />
    </div>

    <div class="album-selected-folder" v-if="$store.state.albumSelected.image">
      <img
        :src="$store.state.albumSelected.image"
        :alt="$store.state.albumSelected.title"
      />
    </div>
  </div>
</template>

<style scoped>
.player {
  width: 100%;
  height: 150px;
  background-color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: relative;
  z-index: 999;
}

.music-infos {
  width: 400px;
  height: 100%;
  display: flex;
  gap: 32px;
}

.music-names {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.music-name {
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: #fff;
}

.music-artist {
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #b3b3b3;
}

.music-option {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #b3b3b3;
}

.player-options {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  color: #b3b3b3;
}

.player-functions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: #b3b3b3;
}

.player-commands {
  width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.player-options input[type="range"] {
  width: 100px;
}

.player-options input[type="range"]::-webkit-slider-runnable-track {
  height: 4px;
  background-color: #404040;
  border-radius: 8px;
}

.player-options input[type="range"]::-webkit-slider-thumb {
  display: none;
}

.player-progress-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.music-duration {
  font-size: 12px;
  color: #b3b3b3;
}

.album-selected-folder {
  width: 290px;
  height: 310px;
  position: absolute;
  left: 0;
  top: -310px;
}

.album-selected-folder img {
  width: 100%;
  height: 100%;
}

#player-functions-option {
  cursor: pointer;
}
</style>
