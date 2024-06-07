<script setup lang="ts">

const props = withDefaults(defineProps<{
    enabled?: boolean
    active?: boolean
}>(), {
    enabled: true,
    active: false
});

const emit = defineEmits<{
    click: []
}>();

function click() {
    if (!props.enabled) {
        return;
    }
    emit('click');
}

</script>


<template>
    <div @click='click' class="button" :class="(active ? 'active' : 'inactive') + ' ' + (enabled ? 'enabled' : 'disabled')">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .button {
        --clr-active: var(--clr-primary); 
        --clr-fg-active: var(--clr-fg-on-primary);

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 0.5s ease;

        padding: 0.5em;

        &.enabled {
            cursor: pointer;
        }

        &.disabled {
            color: var(--clr-fg-1);
        }

        &:hover, &.active {
            background-color: var(--clr-active);
            color: var(--clr-fg-active);
        }
    }
</style>