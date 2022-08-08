import { createStore } from "vuex";

export default createStore({
  state: {
    recentlyPlayed: {},
    yourHeavyRotation: {},
    isPlaying: false,
    albumSelected: {},
    songSelected: {},
    songPropgress: 0,
    timer: 0,
  },
  mutations: {
    populateRecentlyPlayed(state, payload) {
      state.recentlyPlayed = payload;
    },
    populateYourHeavyRotation(state, payload) {
      state.yourHeavyRotation = payload;
    },
    updateRecentlyPlayed(state, payload) {
      const albumAlreadyInRecentlyPlayed = state.recentlyPlayed.albums.some(
        (album) => album.id === payload.id
      );

      if(albumAlreadyInRecentlyPlayed){
        return;
      }

      state.recentlyPlayed.albums.unshift(payload);
      state.recentlyPlayed.albums.pop();
    },
    selectedAlbum(state, payload) {
      state.albumSelected = payload;
    },
    setIsPlaying(state, playload) {
      state.isPlaying = playload;
    },
    selectedSong(state, payload) {
      if (payload.title !== state.songSelected.title) {
        state.songPropgress = 0;
        clearInterval(state.timer);
      }

      state.songSelected = payload;
      state.isPlaying = true;
    },
    setSongPropgress(state, payload) {
      state.songPropgress = payload;
    },
    updatedSongProgress(state) {
      if (!state.isPlaying && !state.songSelected.id) return;

      if (state.isPlaying) {
        state.timer = setInterval(() => {
          if (state.songPropgress >= state.songSelected.duration) {
            state.songPropgress = 0;
            state.isPlaying = false;
            return;
          }

          state.songPropgress++;
        }, 1000);
      } else {
        clearInterval(state.timer);
      }
    },
  },
  actions: {
    populateRecentlyPlayed(context, payload) {
      context.commit("populateRecentlyPlayed", payload);
    },
    populateYourHeavyRotation(context, payload) {
      context.commit("populateYourHeavyRotation", payload);
    },
    selectedAlbum(context, payload) {

      context.commit("updateRecentlyPlayed", payload);
      context.commit("selectedAlbum", payload);
      context.commit("selectedSong", payload.songs[0]);
      context.commit("setIsPlaying", true);
      context.commit("updatedSongProgress");
    },
    setIsPlaying(context, payload) {
      context.commit("setIsPlaying", payload);
      context.commit("updatedSongProgress");
    },
    selectedSong(context, payload) {
      const { isPlaying, album } = payload;

      context.dispatch("selectedAlbum", album);
      context.commit("selectedSong", album.songs[0]);
      context.commit("setIsPlaying", isPlaying);
      context.commit("updatedSongProgress");
    },
    selectSongOnPlaylist(context, payload) {
      const { song, album } = payload;

      context.commit("selectedSong", song);
      context.commit("selectedAlbum", album);
      context.commit('updateRecentlyPlayed', album);
      context.commit("updatedSongProgress");
    },
  },
});
