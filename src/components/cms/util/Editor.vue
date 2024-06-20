<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import Error from '@/components/util/Error.vue';

const props = withDefaults(defineProps<{
    validate?: ValidationCallback
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>(), {
    validate: () => true
});

const error = ref<string>();
const loading = ref<boolean>(false);

const emit = defineEmits<{
    done: []
}>();

function handleValidationResult(result: ValidationResult): boolean {
    if (result !== true && result !== undefined) {
        if (typeof(result) === "string") {
            error.value = result;
        } else {
            console.error(result);
            error.value = "Unknown error";
        }

        return false;
    }
    return true;
}

async function confirm() {
    if (!handleValidationResult(props.validate())) {
        return;
    }

    loading.value = true;
    let result = await props.confirm();
    loading.value = false;

    if (!handleValidationResult(result)) {
        return; 
    }

    emit('done');
}

async function delete_() {
    loading.value = true;
    let result = await props.delete_!!();
    loading.value = false;

    if (!handleValidationResult(result)) {
        return; 
    }

    emit('done');
}

function cancel() {
    emit('done');
}

</script>

<template>
    <div class="editor">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="items">
            <slot name="items"></slot>
        </div>
        <div class="controls">
            <Button :enabled="!loading" @click="confirm"><i class="fa-solid fa-check"></i>&nbsp; CONFIRM</Button>
            <Button :enabled="!loading" @click="cancel"><i class="fa-solid fa-xmark"></i>&nbsp; CANCEL</Button>
            <Button :enabled="!loading" class="delete" v-if="props.delete_" @click="delete_"><i class="fa-solid fa-trash"></i>&nbsp; DELETE</Button>
        </div>
        <Error :error="error"></Error>
        <Spinner v-if="loading"></Spinner>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.editor {
    @include mixins.cmspanel;

    display: flex;
    flex-direction: column;
    padding: 0.5em;

    gap: 0.5em;

    > .controls {
        display: flex;

        > .delete {
            --clr-active: var(--clr-error);
            --clr-fg-active: var(--clr-fg-on-error);
        }
    }

    > .items {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.5em;
    }
}
</style>