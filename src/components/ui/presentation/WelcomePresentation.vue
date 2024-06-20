<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Page1 from './Page1.vue';
import Page2 from './Page2.vue';


const pages = [
    Page1, Page2
];

const currentPage = ref<number>(0);

function selectPage(index: number) {
    currentPage.value = index;
}

</script>


<template>

<div class="welcome-presentation">
    <component v-for="page, index in pages" :is="page" :class="{ current: index == currentPage }"></component>

    <div class="controls">
        <div class="page-button" :class="{ active: i == currentPage }" v-for="r, i in pages" @click="selectPage(i)"></div>
    </div>
</div>


</template>

<style scoped lang="scss">

.welcome-presentation {
    position: relative;
    width: 100%;
    height: 75vh;

    > .page {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 1s all ease;
        visibility: hidden;
        opacity: 0%;

        &.current {
            opacity: 100%;
            visibility: visible;
        }
    }

    > .controls {
        position: absolute;
        z-index: 4;
        width: 100%;
        bottom: 2.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;

        > .page-button {
            cursor: pointer;
            width: 1em;
            height: 1em;
            background-color: var(--clr-bg);
            opacity: 50%;

            transition: 0.5s all ease;

            &.active, &:hover {
                opacity: 100%;
            }
        }

    }
}

</style>