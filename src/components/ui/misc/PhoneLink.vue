<script setup lang="ts">
import { useState } from '@/stores/state';
import Link from './Link.vue';
import { defaultPhone } from '@/lib/fallbackData';
import { computed } from 'vue';

const state = useState();

const phone = computed<string>(() => state.conference?.contact['phone'] ?? defaultPhone);

</script>

<template>
    <Link :href="'tel:' + phone">
        <i class="fa-solid fa-phone"></i>&nbsp; {{ phone }}
    </Link>
</template>