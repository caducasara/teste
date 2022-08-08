<script setup>
import Logo from '../assets/images/Spotify_Logo.png'
import Home from 'vue-material-design-icons/Home.vue'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import MusicBoxMultiple from 'vue-material-design-icons/MusicBoxMultiple.vue'
import PlusBox from 'vue-material-design-icons/PlusBox.vue'
import DownloadCircle from 'vue-material-design-icons/DownloadCircle.vue'
import router from '../router/router'

const getIsCurrentPage = (page) => {
    const currentPage = router.currentRoute.value.path;

    if(page === currentPage){
        return true;
    }

    return false;
}
</script>

<template>
    <aside>
        <div class="logo">
            <img :src="Logo" alt="Spotify logo">
        </div>
        <nav class="nav-menu">
            <ul>
                <li>
                    <div
                        class="nav-item"
                        :class="{'nav-item-selected': getIsCurrentPage('/')}"
                    >
                        <Home :size='24'/>
                        <span>Home</span>
                    </div>
                </li>
                <li>
                    <div class="nav-item">
                        <Magnify :size='24'/>
                        <span>Search</span>
                    </div>
                </li>
                <li>
                    <div class="nav-item">
                        <MusicBoxMultiple :size='24'/>
                        <span>Your Library</span>
                    </div>
                </li>
            </ul>
        </nav>

        <nav class="nav-playlists">
            <p>Playlists</p>
            <ul>
                <li>
                    <div class="add-playlist">
                        <PlusBox :size='24'/>
                        <span>Create Playlist</span>
                    </div>
                </li>
            </ul>
        </nav>

        <div class="install-app">
            <DownloadCircle :size='24'/>
            <span>Install App</span>
        </div>
    </aside>
</template>

<style scoped>
aside {
    width: 290px;
    height: 100%;
    background-color: #040404;
    padding: 16px 8px;
}

.nav-menu {
    width:290px
}

.logo {
    width: 100%;
    height: 50px;
}

.logo img {
    height: 100%;
}

ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    list-style: none;
}

ul li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-menu, .nav-playlists {
    margin-top: 40px;
}

.nav-item, .add-playlist {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 8px 4px;
    border-radius: 4px;
    color: #A3A3A3;
    transition: all 0.4s linear;
}

.nav-item-selected {
    color: white;
    background-color: #282828;
    font-weight: bold;
}

.nav-item span, .add-playlist span {
    font-size: 16px;
    margin-left: 16px;
}

.nav-playlists p {
    color: #A3A3A3;
    text-transform: uppercase;
    font-size: 16px;
}

.install-app {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 8px 4px;
    color: #A3A3A3;
}

.install-app span {
    font-size: 16px;
    font-weight: bold;
    margin-left: 16px;
}
</style>