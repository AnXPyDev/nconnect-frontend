<script setup lang="ts">

import { ref, toRaw } from 'vue';
import TestimonialHolder from './TestimonialHolder.vue';
import TestimonialEditor from './TestimonialEditor.vue';
import { AdminPriv, type Testimonial, type WithID } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import Button from '@/components/util/Button.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import { EmptyTestimonial } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const testimonials = ref<WithID<Testimonial>[]>([]);
const loading = ref<boolean>(true);

remote.post('testimonial/index').then((res: Response<{ testimonials: WithID<Testimonial>[] }>) => {
    testimonials.value = res.testimonials;
    loading.value = false;
}).send();

const toCreate = ref<Testimonial>();
const toEdit = ref<Testimonial>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function edit(t: Testimonial) {
    reset();
    toEdit.value = copyEntity(t);
}

function create() {
    reset();
    toCreate.value = EmptyTestimonial();
}

async function createConfirm() {
    const { testimonial }: { testimonial: WithID<Testimonial> } = await remote.post("testimonial/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    pushEntity(testimonials, testimonial);
}

async function editConfirm() {
    const { testimonial }: { testimonial: WithID<Testimonial> } = await remote.post("testimonial/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    replaceEntity(testimonials, testimonial);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("testimonial/delete", { id }).fail(throwValidation).send();
    deleteEntity(testimonials, id);
}

const auth = useAuth();

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>
        <template v-else>
            <div class="items">
                <TestimonialHolder v-for="t in testimonials" :testimonial="t" @edit="edit(t)"/>
            </div>

            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW TESTIMONIAL</Button>

            <TestimonialEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create Testimonial
            </TestimonialEditor>
            <TestimonialEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit Testimonial [{{ toEdit.id }}]
            </TestimonialEditor>
        </template>
    </div>

</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}
</style>