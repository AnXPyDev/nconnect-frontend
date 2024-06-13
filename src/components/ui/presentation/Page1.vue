<script setup lang="ts">
import Page from './Page.vue';
import Button from '@/components/util/Button.vue';
</script>

<template>
    <Page>
        <template v-slot:background>
            <img class="bgimage" src="@/assets/images/nconnect-background.jpg"/>
        </template>
        <template v-slot:content>
            <div class="content">
                <span class="date">14 MAREC 2024, NITRA</span>
                <span class="desc">TECH KONFERENCIA PRE ŠTUDENTOV V NITRE</span>
                <span class="title">nCONNECT24</span>
                <div class="buttons">
                    <Button>PROGRAM KONFERENCIE</Button> 
                    <Button>SPEAKERS</Button> 
                    <Button>REGISTRÁCIA</Button> 
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

        @include media.phone { font-size: 4em; }
    }

    > .buttons {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;

        > .button {
            --padding: 1em;
            --border: solid 1px var(--clr-bg);
            --clr-active: var(--clr-bg);
            --clr-fg-active: var(--clr-primary);
        }
    }
}
</style>