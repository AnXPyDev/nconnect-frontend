<script setup lang="ts">
import { ref } from 'vue';
import { type Resource } from '@/lib/Bridge';
import Editor from './Editor.vue';
import Input from '../Input.vue';
import { getResourceURL } from '@/lib/urls';
import Button from '../Button.vue';
import { pickFiles, type ImageUploaderFile } from '@/lib/ImageUploader';
import remote from '@/lib/ApiRemote';

const props = withDefaults(defineProps<{
    allowDelete?: boolean
    confirm?: () => ConfirmationResult
}>(), {
    confirm: () => true
});

const resource = defineModel<Resource>("resource", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
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

    await remote.put("resource/upload", { id: resource.value.id!!, extension: newImage.extension }, newImage.blob).send();
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
    <Editor :allow-delete="allowDelete" :confirm="confirm" :validate="validate" @done="emit('done')" @cancel="emit('cancel')" @delete="emit('delete')">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input class="name" v-model="resource.name">Name</Input>
            <div class="image">
                <img :src="imageURL"/>
            </div>
            <Button @click="chooseImage"><i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; UPDATE IMAGE</Button>
        </template>
    </Editor>
</template>

<style scoped lang="scss">
.name {
    --min-input-width: min(100%, 10em);
}

.image {
    display: flex;
    > img {
        max-width: min(100%, 10em);
    }
}
</style>