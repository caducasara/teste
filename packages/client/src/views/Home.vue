<script>
import SectionPlaylists from "../components/SectionPlaylists.vue";
import { spotify } from "../services/spotifyApiConfig.js";

export default {
  name: "Home",
  components: {
    SectionPlaylists,
  },
  async mounted() {
    const { data } = await spotify.get("playlists");

    
    if (
      !(!!this.$store.state.recentlyPlayed.albums &&
      !!this.$store.state.yourHeavyRotation.albums)
    ) {
      data.forEach((playlist) => {
        switch (playlist.name) {
          case "Recently Played":
            this.$store.dispatch("populateRecentlyPlayed", playlist);
            break;
          case "Your Heavy Rotation":
            this.$store.dispatch("populateYourHeavyRotation", playlist);
            break;
          default:
            this.$store.dispatch("populateRecentlyPlayed", []);
            this.$store.dispatch("populateYourHeavyRotation", []);
        }
      });
    }
  },
};
</script>

<template>
  <div class="container">
    <SectionPlaylists
      :title="this.$store.state.recentlyPlayed.name"
      :albums="this.$store.state.recentlyPlayed.albums"
    />
    <SectionPlaylists
      :title="this.$store.state.yourHeavyRotation.name"
      :albums="this.$store.state.yourHeavyRotation.albums"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 40px;
}
</style>
