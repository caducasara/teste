<script setup>
import Account from 'vue-material-design-icons/Account.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import MenuDown from 'vue-material-design-icons/MenuDown.vue';
import router from '../router/router';

const hanleToPage = (page) => {
    router.push(page);
}

</script>

<template>
    <header>
        <nav class="navigation">
            <ul>
                <li class="prev">
                    <button 
                        class="button-nav"
                        @click="hanleToPage('/')" 
                        :disabled="false"
                    >
                        <ChevronLeft :size='22'/>
                    </button>
                </li>
                <li class="next">
                    <button 
                        class="button-nav"
                        :disabled="true"
                    >
                        <ChevronRight :size='22'/>
                    </button>
                </li>
            </ul>
        </nav>

        <div class="user">
            <Account :size='22'/>
            <p>Carlos</p>
            <MenuDown :size='22' />
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    position: sticky;
    top: 0;
    z-index: 999;
}

.user {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
    border-radius: 16px;
    background-color: #050505;
    padding: 2px 4px;
    color: white;
}

.navigation ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    list-style: none
}

.button-nav {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #050505;
    color: white;
    font-size: 18px;
    border: 0;
    cursor: pointer;
}

.button-nav:disabled {
    background-color: rgba(10, 10, 10, 0.5);
}
</style>