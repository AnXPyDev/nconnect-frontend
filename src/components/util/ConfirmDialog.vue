<script setup lang="ts">
import Overlay from './Overlay.vue';
import Button from './Button.vue';

const props = withDefaults(defineProps<{
    yesLabel: string,
    noLabel: string
}>(), {
    yesLabel: "YES",
    noLabel: "NO"
});

const emit = defineEmits<{
    yes: []
    no: []
}>();

</script>

<template>
    <Overlay>
        <div class="dialog">
            <div class="query"><slot></slot></div>
            <div class="controls">
                <Button @click="emit('yes')"><i class="fa-solid fa-check"></i>&nbsp; {{ yesLabel }}</Button>
                <Button @click="emit('no')"><i class="fa-solid fa-xmark"></i>&nbsp; {{ noLabel }}</Button>
            </div>
        </div>
    </Overlay>
</template>

<style scoped lang="scss">
.dialog {
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
    background-color: var(--clr-bg);

    > .controls {
        display: flex;
    }
}
</style>