<script setup lang="ts">
import { AdminPriv, type Conference } from '@/lib/remote/Models';
import { useState } from '@/stores/state';
import { ref, toRaw, useAttrs } from 'vue';
import ConferenceHolder from './ConferenceHolder.vue';
import ConferenceEditor from './ConferenceEditor.vue';
import Button from '@/components/util/Button.vue';
import remote from '@/lib/remote/Remote';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const state = useState();
const toEdit = ref<Conference>();

function reset() {
    toEdit.value = undefined;
}

function edit() {
    toEdit.value = structuredClone(toRaw(state.conference));
}

async function confirm() {
    const { conference }: { conference: Conference } = await remote.post("conference/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    state.conference = conference;
}

const auth = useAuth();


</script>

<template>

<div class="manager">
    <div class="items">
        <ConferenceHolder :conference="state.conference!!"></ConferenceHolder>
    </div>
    <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="edit"><i class="fa-solid fa-pen"></i>&nbsp; EDIT</Button>
    <ConferenceEditor :confirm="confirm" @done="reset" v-if="toEdit" v-model="toEdit"></ConferenceEditor>
</div>

</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}
</style>