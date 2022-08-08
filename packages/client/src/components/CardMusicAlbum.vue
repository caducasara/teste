<script>
import MusicNoteEighth from "vue-material-design-icons/MusicNoteEighth.vue";
import formatDurationForMinutes from "../utils/traslateDurationForMinutes";

export default {
  name: "CardMusicAlbum",
  props: {
    song: Object,
    album: Object,
  },
  components: {
    MusicNoteEighth,
  },
  methods: {
    songSelected(song) {
      const data = {
        song,
        album: this.album
      }

      this.$store.dispatch("selectSongOnPlaylist", data);
    },
    isSongSelected(song) {
      return (
        this.$store.state.songSelected.id === song.id &&
        this.$store.state.songSelected.title === song.title
      );
    },
  },
  setup() {
    return {
      formatDurationForMinutes,
    };
  },
};
</script>

<template>
  <div class="card-music-list" @click="songSelected(song)">
    <MusicNoteEighth :class="{ selected: isSongSelected(song) }" />
    <div class="music-infos">
      <strong :class="{ selected: isSongSelected(song) }">{{
        song.title
      }}</strong>
      <span>{{ album.artist }}</span>
    </div>
    <span :class="{ selected: isSongSelected(song) }">{{
      formatDurationForMinutes(song.duration)
    }}</span>
  </div>
</template>

<style scoped>
.card-music-list {
  width: 100%;
  height: 48px;
  padding: 8px;
  color: #a3a3a3;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
}

.card-music-list span {
  font-size: 12px;
}

.music-infos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
}

.music-infos strong {
  color: #fff;
}

.music-infos span {
  font-size: 12px;
}

.card-music-list .selected {
  color: #00ca4e;
}
</style>
