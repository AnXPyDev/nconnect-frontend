<script setup lang="ts">
import { useState } from '@/stores/state';
import MailLink from './misc/MailLink.vue';
import PhoneLink from './misc/PhoneLink.vue';
import { defaultLocationFull } from '@/lib/fallbackData';
import LocationLink from './misc/LocationLink.vue';

const state = useState();

</script>

<template>
    <div class="info-bar content-container">
        <div class="content">
            <div class="left">
                <LocationLink/>
            </div>

            <div class="right">
                <PhoneLink/>
                <MailLink/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@use '@/styles/lib/media';

.info-bar {
    background-color: var(--clr-primary);
    color: var(--clr-fg-on-primary);
    padding-block: 0.75em;

    > .content {
        display: flex;
        justify-content: space-between;
        gap: 0.5em;

        > .right {
            display: flex;
            gap: 0.5em; 
        }

        @include media.phone {
            flex-direction: column;

            > .right {
                flex-direction: column;
            }
        }

    }
}
</style>