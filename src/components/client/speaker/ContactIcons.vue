<script setup lang="ts">
import type { Contact } from '@/lib/remote/Models';


const props = defineProps<{
    contact?: Contact
}>();

const map: { [key: string]: string } = {
    "facebook": "fa-brands fa-facebook",
    "instagram": "fa-brands fa-instagram",
    "twitter": "fa-brands fa-x-twitter",
    "linkedin": "fa-brands fa-linkedin"
}

function getIcon(name: string) {
    return map[name] ?? "fa-solid fa-link";
}

</script>

<template>
    <div v-if="contact">
        <a v-for="link, name in contact" target="_blank" class="contact-icon" :href="link">
            <i :class="getIcon(name as string)"></i>
        </a>
    </div>
</template>

<style scoped lang="scss">
.contact-icon {
    opacity: 80%;
    transition: 0.25s all ease;

    &:hover {
        cursor: pointer;
        opacity: 100%;
    }
}
</style>