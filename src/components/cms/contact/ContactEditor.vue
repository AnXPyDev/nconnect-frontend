<script setup lang="ts">
import { type Contact } from '@/lib/remote/Models';
import TextArea from '@/components/util/input/TextArea.vue';
import { ref } from 'vue';
import Button from '@/components/util/Button.vue';
import Input from '@/components/util/input/Input.vue';

const contact = defineModel<Contact>({ required: true });

function remove(key: string) {
    delete contact.value[key];
}

const newKey = ref<string>("");

function add() {
    if (!newKey.value) {
        return;
    }
    contact.value[newKey.value] = "";
    newKey.value = "";
}


</script>

<template>
    <div class="contact-editor">
        <div class="label"><slot></slot></div>

        <div class="items">
            <div class="item" v-for="_, key in contact">
                <Input v-model="contact[key]">{{ key }}</Input>
                <i @click="remove(key)" class="icon-button fa-solid fa-xmark"></i>
            </div>
        </div>

        <div class="newkey">
            <Input v-model="newKey">Link for</Input>
            <Button @click="add"><i class="fa-solid fa-plus"></i>&nbsp; ADD LINK</Button>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.contact-editor {
    @include mixins.cmspanel;
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    > .items {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        width: 100%;

        > .item {
            display: flex;
            width: 100%;
            align-items: center;
            gap: 0.5em;

            > .icon-button {
                cursor: pointer;
                font-size: 1.2em;
                &:hover {
                    color: var(--clr-primary);
                }
            }
        }
    }

    > .newkey {
        display: flex;
    }

}
</style>