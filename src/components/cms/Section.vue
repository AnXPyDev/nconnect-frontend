<script setup lang="ts">
import { ref } from 'vue';


const enabled = ref<boolean>(false);

</script>

<template>

<div class="section" :class="enabled ? 'open' : 'closed'">
    <div class="header" @click="enabled=!enabled">
        <span class="title"><slot name="title"></slot></span>
        <span class="toggle">
            <i v-if="enabled" class="fa-solid fa-chevron-down"></i>
            <i v-else class="fa-solid fa-chevron-right"></i>
        </span>
    </div>
    <slot v-if="enabled"></slot>
</div>

</template>

<style scoped lang="scss">

.section {
    display: flex;
    flex-direction: column;
    align-items: start;

    > .header {
        display: flex;
        align-items: baseline;

        cursor: pointer;


        > .title {
            font-size: 1.5em;
            color: var(--clr-primary);
        }

        > .toggle {
            display: flex;

            align-items: center;
            justify-content: center;

            width: 2em;
            height: 1.5em;
            
            margin-left: 0.5em;

            border-radius: 0.5em;

        }

        &:hover {
            > .toggle {
                background-color: var(--clr-primary);
                color: var(--clr-fg-on-primary);
            }
        }

    }

    &.open {
        > .header {
            padding-bottom: 0.5em;
        }
    }

}

</style>