<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits<{
    'clickout': []
}>();

const overlay = ref<HTMLElement>();

function handleClick(event: MouseEvent) {
    if (event.currentTarget == event.target) {
        emit('clickout');
    }
}


</script>

<template>
    <div @click="handleClick" ref="overlay" class="overlay">
        <slot></slot>
    </div>
</template>

<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
</style>