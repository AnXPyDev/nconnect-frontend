<script setup lang="ts">
import Page from '@/components/ui/presentation/Page.vue';
import Button from '@/components/util/Button.vue';

const props = withDefaults(defineProps<{
    origin: string
    section: string
    location: string
}>(), {
    section: "DOMOV",
    origin: "/"
});

</script>

<template>
    <Page class="page-header">
        <template v-slot:background>
            <img class="bgimage" src="@/assets/images/nconnect-background.jpg"/>
        </template>
        <template v-slot:content>
            <div class="content">
                <div class="subtitle">
                    <RouterLink class="router-link" :to="origin">{{ section }}</RouterLink>
                    <span>/</span>
                </div>
                <div class="title">{{ location }}</div>
            </div>
        </template>
    </Page>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.page-header {
    height: 25vh;
}

.bgimage {
    @include mixins.pagebgimg;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;
    color: var(--clr-fg-inv);
    align-items: start;
    gap: 0.5em;

    > .subtitle {
        font-size: 1em;
        display: flex;
        gap: 0.5em;

        > .router-link {
            opacity: 80%;
            transition: 0.5s ease all;

            &:hover {
                opacity: 100%;
            }
        }
    }

    > .title {
        text-transform: uppercase;
        font-size: 2.5em;
        font-weight: 900;
    }
}
</style>