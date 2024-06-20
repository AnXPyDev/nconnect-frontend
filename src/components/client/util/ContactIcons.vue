<script setup lang="ts">
import type { Contact } from '@/lib/remote/Models';

const icons: Record<string, string> = {
    "facebook": "fa-brands fa-facebook",
    "instagram": "fa-brands fa-instagram",
    "twitter": "fa-brands fa-x-twitter",
    "linkedin": "fa-brands fa-linkedin",
    "website": "fa-solid fa-globe",
    "phone": "fa-solid fa-phone",
    "email": "fa-solid fa-envelope",
    "location": "fa-solid fa-location-dot"
};

const prefix: Record<string, string> = {
    "email": "mailto:",
    "phone": "tel:" 
};

const props = defineProps<{
    contact?: Contact
    ignore?: string[]
}>();

function shouldIgnore(key: string) {
    if (props.ignore) {
        return !!props.ignore.find((v) => v == key);
    }
    return false;
}

function getIcon(name: string) {
    return icons[name] ?? "fa-solid fa-link";
}

function getHref(key: string, link: string) {
    return prefix[key] ?? "" + link;
}

</script>

<template>
    <div v-if="contact">
        <template v-for="link, name in contact">
            <a  v-if="!shouldIgnore(name)" target="_blank" class="contact-icon" :href="getHref(name, link)">
                <i :class="getIcon(name as string)"></i>
            </a>
        </template>
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