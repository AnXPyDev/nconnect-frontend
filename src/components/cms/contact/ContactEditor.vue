<script setup lang="ts">
import type { Contact } from '@/lib/remote/Models';
import TextArea from '@/components/util/input/TextArea.vue';
import { ref } from 'vue';

const contact = defineModel<any>({ required: true });

const text = ref<string>(JSON.stringify(contact.value));

function update() {
    contact.value = JSON.parse(text.value);
}

</script>

<template>
    <TextArea v-model="text">
        <slot></slot>
    </TextArea>
    <Button @click="update">ok</Button>
</template>

<style scoped lang="scss">

</style>