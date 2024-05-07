<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import InfoBar from './components/InfoBar.vue';
</script>

<template>
  <div class="navigation-area primary-shadow">
    <InfoBar></InfoBar>
    <NavBar></NavBar>
  </div><!-- /.navigation-area -->

  <RouterView />
</template>

<style scoped lang="scss">
</style>
