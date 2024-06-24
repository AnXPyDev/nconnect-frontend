<script setup lang="ts">
import { ref } from 'vue';
import { type Image } from '@/lib/remote/Models';
import Editor from '@/components/cms/util/Editor.vue';
import Input from '@/components/util/input/Input.vue';
import { getResourceURL } from '@/lib/remote/Util';
import Button from '@/components/util/Button.vue';
import { pickFiles, type ImageUploaderFile } from '@/lib/cms/ImageUploader';
import remote from '@/lib/remote/Remote';
import { throwValidation, type ConfirmationCallback } from '@/lib/cms/Editor';

const props = withDefaults(defineProps<{
    confirm?: ConfirmationCallback
    delete_?: ConfirmationCallback
}>(), {
    confirm: () => true
});

const resource = defineModel<Image>({ required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
}>();

const imageURL = ref<string>(getResourceURL(resource.value.id!!));

function validate() {
    if (resource.value.name.length == 0) {
        return "Name field empty";
    }
    return true;
}

let newImage: ImageUploaderFile | undefined;

async function confirm() {
    await props.confirm();

    if (newImage === undefined) {
        return;
    }

    await remote.put("resource/upload", { id: resource.value.id!!, extension: newImage.extension }, newImage.blob).fail(throwValidation).send();
}


async function chooseImage() {
    const files = await pickFiles(false);
    if (files.length == 0) {
        return;
    }

    const image = files[0];
    imageURL.value = image.blob_src;
    newImage = image;
}

</script>

<template>
    <Editor v-bind="{ confirm, validate, delete_ }" @done="emit('done')">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input class="name" v-model="resource.name">Name</Input>
            <div class="image">
                <img :src="imageURL"/>
                <Button @click="chooseImage"><i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; UPDATE IMAGE</Button>
            </div>
        </template>
    </Editor>
</template>

<style scoped lang="scss">
.name {
    --min-input-width: min(100%, 10em);
}

.image {
    width: auto !important;
    display: flex;
    flex-direction: column;
    align-items: start;
    > img {
        max-width: min(100%, 10em);
    }
}
</style>