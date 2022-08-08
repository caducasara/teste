<script>
import Heart from "vue-material-design-icons/Heart.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import CardMusicAlbum from "../components/CardMusicAlbum.vue";
import PauseCircleOutline from "vue-material-design-icons/PauseCircleOutline.vue";
import PlayCircleOutline from "vue-material-design-icons/PlayCircleOutline.vue";
import router from "../router/router";
import { spotify } from "../services/spotifyApiConfig";
import { useStore } from "vuex";

export default {
  name: "Album",
  data() {
    return {
      album: {},
    };
  },
  components: {
    Heart,
    DotsHorizontal,
    CardMusicAlbum,
    PauseCircleOutline,
    PlayCircleOutline,
  },
  async mounted() {
    const { id } = router.currentRoute.value.params;
    const { data } = await spotify.get(`album/${id}`);

    this.album = data;
  },
  setup() {
    const store = useStore();
    const { state } = store;

    const setMusicIsPlaying = (isPlaying, album) => {
      if (album.id === state.albumSelected.id) {
        store.dispatch("setIsPlaying", isPlaying);
        return;
      }

      const data = {
        isPlaying,
        album
      }

      store.dispatch("selectedSong", data);
    };

    return {
      setMusicIsPlaying,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="album-infos">
      <div class="image-container">
        <img :src="album.image" :alt="album.title" />
        <div
          class="image-player"
          v-if="
            this.$store.state.isPlaying &&
            this.$store.state.albumSelected.id === album.id
          "
        >
          <PauseCircleOutline
            id="player-image-option"
            :size="42"
            v-if="this.$store.state.isPlaying"
            @click="setMusicIsPlaying(false, album)"
          />
        </div>
      </div>
      <h1 class="album-name">{{ album.title }}</h1>
      <span class="artists-name">{{ album.artist }}</span>
      <button
        class="player"
        @click="setMusicIsPlaying(true, album)"
        v-if="
          (!this.$store.state.isPlaying &&
            this.$store.state.albumSelected.id === album.id) ||
          this.$store.state.albumSelected.id !== album.id
        "
      >
        Play
      </button>
      <button
        class="player"
        @click="setMusicIsPlaying(false, album)"
        v-if="
          this.$store.state.isPlaying &&
          this.$store.state.albumSelected.id === album.id
        "
      >
        Pause
      </button>
      <div class="actions">
        <Heart :size="28" id="like" />
        <DotsHorizontal :size="28" />
      </div>
      <div class="infos">
        {{ album.year }} · {{ album.songs?.length }} SONGS
      </div>
    </div>
    <div class="album-musics">
      <ul>
        <li v-for="song in album.songs">
          <CardMusicAlbum :song="song" :album="album" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  gap: 16px;
}

.album-infos {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 16px;
  width: 30%;
  height: 100%;
}
.image-container {
  width: 300px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 100%;
}

.album-musics {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
  height: 100%;
}

.album-name {
  text-align: center;
  color: #fff;
  font-weight: 700;
}

.artists-name {
  color: #a3a3a3;
  text-align: center;
}

.player {
  font-size: 22px;
  margin-top: 16px;
  text-transform: uppercase;
  width: 200px;
  color: #fff;
  padding: 8px;
  border: 0;
  border-radius: 50px;
  background-color: #00ca4e;
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  color: white;
}

.actions #like {
  color: #00ca4e;
}

.infos {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a3a3a3;
  font-size: 18px;
}

.album-musics ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  list-style: none;
}

.album-musics ul li {
  width: 100%;
}

.image-player {
  display: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
}

.image-container .image-player-active {
  display: block;
}

#player-image-option {
  cursor: pointer;
}
</style>
