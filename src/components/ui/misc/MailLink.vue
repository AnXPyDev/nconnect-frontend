<script setup lang="ts">
import { useState } from '@/stores/state';
import Link from './Link.vue';
import { defaultEmail } from '@/lib/fallbackData';
import { computed } from 'vue';

const state = useState();

const email = computed(() => state.conference?.contact['email'] ?? defaultEmail)

</script>

<template>
    <Link :href="'mailto:' + email">
        <i class="fa-solid fa-envelope"></i>&nbsp; {{ email }}
    </Link>
</template>