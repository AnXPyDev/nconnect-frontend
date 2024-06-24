<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import Error from '@/components/util/Error.vue';
import { ValidationError, type ConfirmationCallback, type ConfirmationResult, type ValidationCallback, type ValidationResult } from '@/lib/cms/Editor';
import Overlay from '@/components/util/Overlay.vue';
import ConfirmDialog from '@/components/util/ConfirmDialog.vue';

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
    let result: ValidationResult;
    try {
        result = await props.confirm();
    } catch (e) {
        if (e instanceof ValidationError) {
            result = e.result;
        }
    }
    loading.value = false;

    if (!handleValidationResult(result)) {
        return; 
    }

    emit('done');
}

async function delete_() {
    askDelete.value = false;
    loading.value = true;
    let result: ValidationResult;
    try {
        result = await props.delete_!!();
    } catch (e) {
        if (e instanceof ValidationError) {
            result = e.result;
        }
    }
    loading.value = false;

    if (!handleValidationResult(result)) {
        return; 
    }

    emit('done');
}

function cancel() {
    emit('done');
}

const askDelete = ref(false);

</script>

<template>
    <Overlay>
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
                <Button :enabled="!loading" class="delete" v-if="props.delete_" @click="askDelete = true"><i class="fa-solid fa-trash"></i>&nbsp; DELETE</Button>
            </div>
            <Error :error="error"></Error>
            <Spinner v-if="loading"></Spinner>
        </div>
        <ConfirmDialog v-if="askDelete" @yes="delete_" @no="askDelete = false" yes-label="DELETE" no-label="CANCEL">Are you sure you want to delete this entity?</ConfirmDialog>
    </Overlay>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.editor {
    @include mixins.cmspanel;

    background-color: var(--clr-bg);
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    
    min-width: 800px;

    gap: 0.5em;

    > .title {
        color: var(--clr-primary);
        font-size: 1.2em;
        font-weight: 900;
    }

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

        > * {
            width: 100%;
        }
    }
}
</style>