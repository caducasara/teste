<script>
import CardMusic from "./CardMusic.vue";
export default {
  props: {
    title: String,
    albums: Array,
  },
  components: {
    CardMusic,
  },
};
</script>

<template>
  <div class="container">
    <header>
      <h3>{{ title }}</h3>
      <span>see all</span>
    </header>
    <div class="container-music-cards">
      <CardMusic v-for="album in albums" :key="album.id" :album="album"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.container header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.container h3 {
  font-size: 30px;
  font-weight: bold;
  color: white;
}

.container span {
  color: #a3a3a3;
  font-size: 12px;
  text-transform: uppercase;
}

.container-music-cards {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 16px;
  overflow: hidden;
}
</style>
