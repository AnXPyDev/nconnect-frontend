<script setup lang="ts">
import { useState } from '@/stores/state';
import Link from './Link.vue';
import { defaultLocationFull, defaultLocationLink } from '@/lib/fallbackData';
import { computed } from 'vue';

const state = useState();

const link = computed(() => state.conference?.location_link ?? defaultLocationLink);
const location = computed(() => state.conference?.location_full ?? defaultLocationFull);

</script>

<template>
    <Link :href="link">
        <i class="fa-solid fa-location-dot"></i>&nbsp; {{ location }}
    </Link>
</template>