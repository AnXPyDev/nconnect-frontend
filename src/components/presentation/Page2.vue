<script setup lang="ts">
import Page from './Page.vue';
import Button from '../Button.vue';
</script>

<template>
    <Page>
        <template v-slot:background>
            <img class="bgimage" src="https://nconnect.sk/images/bg/header-2.jpg"/>
        </template>
        <template v-slot:content>
            <div class="content">
                <span class="date">14 MAREC 2024, NITRA</span>
                <span class="desc">ŠTUDENTSKÉ CENTRUM UKF</span>
                <span class="title">Vidíme sa tam</span>
                <div class="buttons">
                    <Button>SPONZORI</Button> 
                    <Button>KONTAKTUJTE NÁS</Button> 
                </div>
            </div>
        </template>
    </Page>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.bgimage {
    @include mixins.pagebgimg;
}

h2 {
    color: var(--clr-bg);
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    color: var(--clr-fg-inv);
    align-items: center;
    gap: 1em;

    > span {
        text-transform: uppercase;
    }

    > .date {
        font-size: 1.5em;
        font-weight: 300;
    }

    > .desc {
        font-size: 3em;
        font-weight: 300;
    }

    > .title {
        font-size: 6em;
        font-weight: 900;
    }

    > .buttons {
        display: flex;
        gap: 1em;

        > .button {
            --padding: 1em;
            --border: solid 1px var(--clr-bg);
            --clr-active: var(--clr-bg);
            --clr-fg-active: var(--clr-primary);
        }
    }
}
</style>