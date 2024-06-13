<script setup lang="ts">
import type { Contact } from '@/lib/remote/Models';


const props = defineProps<{
    contact: Contact
}>();

</script>

<template>
    <div class="contact">
        <div v-for="item, key in contact">[{{ key }}] {{ item }}</div>
    </div>
</template>

<style scoped lang="scss">
.contact {
}
</style>