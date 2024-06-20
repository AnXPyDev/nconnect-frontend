<script setup lang="ts">
import type { Organizer } from '@/lib/remote/Models';
import { getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from '../util/ContactIcons.vue';
import Link from '@/components/ui/misc/Link.vue';

const props = defineProps<{
    organizer: Organizer
}>();

</script>

<template>

<div class="organizer-card">
    <div class="left">
        <img :src="getThumbnailURL(organizer.image_id)" />
    </div>
    <div class="right">
        <div class="name">{{ organizer.name }}</div>
        <div class="role">{{ organizer.role }}</div>
        <div class="contact">
            <Link v-if="organizer.contact['phone']"
                :href="'tel:' + organizer.contact['phone']">
                <i class="fa-solid fa-phone"></i>&nbsp; {{ organizer.contact['phone'] }}
            </Link>
            <Link v-if="organizer.contact['email']"
                :href="'tel:' + organizer.contact['email']">
                <i class="fa-solid fa-envelope"></i>&nbsp; {{ organizer.contact['email'] }}
            </Link>
        </div>
        <ContactIcons class="contact-icons" :contact="organizer.contact" :ignore="['phone', 'email']" />
    </div>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/dimens';

.organizer-card {
    display: flex;
    gap: 1em;
    align-items: start;

    > .left {
        @include dimens.min-max(width, 30%);
        aspect-ratio: 1;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    > .right {
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        > .name {
            text-transform: uppercase;
            font-weight: 900;
            font-size: 1.1em;
        }

        > .role {
            color: var(--clr-primary);
        }

        > .contact {
            font-size: 0.9em;
            display: flex;
            flex-direction: column;
            gap: 0.5em;
        }

        > .contact-icons {
            display: flex;
            gap: 0.5em;
            font-size: 1.2em;
        }

    }
}

</style>