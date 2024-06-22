<script setup lang="ts">
import { useState } from '@/stores/state';
import Page from './Page.vue';
import Button from '@/components/util/Button.vue';
import { computed } from 'vue';
import { presentationDateFormat } from '@/lib/formats';
import { useAuth } from '@/stores/auth';

const state = useState();
const auth = useAuth();

</script>

<template>
    <Page>
        <template v-slot:background>
            <img class="bgimage" src="@/assets/images/nconnect-background.jpg"/>
        </template>
        <template v-slot:content>
            <div class="content">
                <span class="date">{{ presentationDateFormat(state.conference!!.date) }} , {{ state.conference!!.location_city }}</span>
                <span class="desc">{{ state.conference!!.presentation_subtitle }}</span>
                <span class="title">{{ state.conference!!.presentation_title }}</span>
                <div class="buttons">
                    <RouterLink :to="{ name: 'schedule' }"><Button>PROGRAM KONFERENCIE</Button></RouterLink>
                    <RouterLink :to="{ name: 'speakers' }"><Button>SPEAKERS</Button></RouterLink>
                    <RouterLink v-if="auth.canSignUp" :to="{ name: 'signup' }"><Button>REGISTRÁCIA</Button></RouterLink>
                </div>
            </div>
        </template>
    </Page>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';
@use '@/styles/lib/media';

.bgimage {
    @include mixins.pagebgimg;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    color: var(--clr-fg-inv);
    align-items: start;
    gap: 1em;

    > span {
        text-transform: uppercase;
    }

    > .date {
        font-size: 1.5em;
        font-weight: 300;

        @include media.phone { font-size: 1em; }
    }

    > .desc {
        font-size: 3em;
        font-weight: 300;

        @include media.phone { font-size: 2em; }
    }

    > .title {
        font-size: 6em;
        font-weight: 900;
        text-transform: none;

        @include media.phone { font-size: 4em; }
    }

    > .buttons {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;

        .button {
            --padding: 1em;
            --border: solid 1px var(--clr-bg);
            --clr-active: var(--clr-bg);
            --clr-fg-active: var(--clr-primary);
        }
    }
}
</style>