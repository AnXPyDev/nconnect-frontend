<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router';


const props = defineProps<RouterLinkProps>();

</script>


<template>
    <RouterLink class="router-link" v-bind="props">
        <div class="top">
            <slot></slot> 
        </div>
        <div class="bottom">

        </div>
    </RouterLink>
</template>

<style scoped lang="scss">
.router-link {
    display: flex;
    flex-direction: column;
    gap: 0.3em;

    > .top {
        width: 100%;
        padding-inline: 1em;
        padding-block: 0.75em;
        transition: 0.5s ease all;
    }

    > .bottom {
        height: 1px;
        width: 0%;
        transition: 0.5s ease all;
        background-color: var(--clr-primary);
    }


    transition: all 0.5s ease;

    &:hover, &.router-link-active {
        > .top {
            color: var(--clr-fg-on-primary);
            background-color: var(--clr-primary);
        }

        > .bottom {
            width: 100%;
        }
    }
}
</style>