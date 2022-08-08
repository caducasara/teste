<script>
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";

export default {
  name: "CardMusic",
  props: {
    album: Object,
  },
  components: {
    Play,
    Pause,
  },
  methods: {
    selectAlbum(album) {
      if(album.id === this.$store.state.albumSelected.id){
        this.$store.dispatch("setIsPlaying", !this.$store.state.isPlaying);
        return;
      }

      this.$store.dispatch("selectedAlbum", album);
    },
    setSongPaused() {
      this.$store.dispatch("setIsPlaying", false);
    }
  },
};
</script>

<template>
  <div class="container-music">
    <router-link
      class="router-link-container"
      :to="{ name: 'album', params: { id: album.id } }"
    >
      <img :src="album.image" :alt="album.title" />
      <span class="playlist-name">{{ album.title }}</span>
      <span class="music-name">{{ album.artist }}</span>
    </router-link>
    <button
      :class="{ 'album-selected': $store.state.albumSelected.id === album.id}"
      @click="selectAlbum(album)"
    >
      <Play :size="22"/>
    </button>

    <button
    v-if="($store.state.albumSelected.id === album.id) && $store.state.isPlaying"
      :class="{ 'album-selected': $store.state.albumSelected.id === album.id}"
      @click="setSongPaused()"
    >
      <Pause :size="22"/>
    </button>
  </div>
</template>

<style scoped>
.container-music {
  width: calc(100% / 5);
  max-width: 230px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
}
.container-music:hover button {
  display: block;
}

.router-link-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 290px;
  border-radius: 8px;
  background-color: #282828;
  padding: 12px;
  text-decoration: none;
}

.container-music img {
  width: 100%;
  height: 190px;
  object-fit: contain;
}

.playlist-name {
  font-weight: bold;
  color: #fff;
}

.music-name {
  font-size: 12px;
  color: #a3a3a3;
}

.container-music  button {
  display: none;
  position: absolute;
  right: 12px;
  bottom: 8px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 0;
  color: #fff;
  background-color: #00ca4e;
  cursor: pointer;
  z-index: 100;
}

.container-music .album-selected {
  display: block;
}
</style>
