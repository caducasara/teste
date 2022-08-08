<script>
import Sidebar from './components/Sidebar.vue';
import Player from './components/Player.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Player,
    Header
  }
}
</script>

<template>
  <div class="container">
    <Sidebar />
    <main>
      <Header></Header>
      <router-view></router-view>
    </main>
  </div>
  <Player />
</template>

<style scoped>

main {
  width: 100%;
  height: 100%;
  padding: 16px 32px;
  background-color: #121212;
  overflow-x: auto;
}

main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track{
  background: #121212;
}

main::-webkit-scrollbar-thumb{
  background-color: #5A5A5A;
  border-radius: 20px;
}

.container {
  display: flex;
  width: 100%;
  height: 84.7vh;
}
</style>
