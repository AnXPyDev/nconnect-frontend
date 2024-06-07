<script setup lang="ts">

import { ref, toRaw } from 'vue';
import TestimonialHolder from './Testimonial.vue';
import TestimonialEditor from './TestimonialEditor.vue';
import type { Testimonial } from '@/lib/Bridge';
import remote from '@/lib/ApiRemote';
import Button from '../Button.vue';

const testimonials = ref<Testimonial[]>([]);

remote.post('testimonial/index').then((res: { testimonials: Testimonial[] }) => {
    testimonials.value = res.testimonials;
}).send();

const toCreate = ref<Testimonial>();
const toEdit = ref<Testimonial>();

function cancel() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function edit(t: Testimonial) {
    cancel();
    toEdit.value = Object.assign({}, t);
}

function create() {
    cancel();
    toCreate.value = {
        author: "",
        description: ""
    };
}

function createConfirm() {
    const t = toRaw(toCreate.value)!!;
    cancel();
    remote.post("testimonial/create", t).then((res: { testimonial: Testimonial }) => {
        testimonials.value.push(res.testimonial);
    }).send();
}

function editConfirm() {
    const t = toRaw(toEdit.value)!!;
    cancel();
    remote.post("testimonial/edit", t).then((res: { testimonial: Testimonial }) => {
        Object.assign(testimonials.value[testimonials.value.findIndex((v) => v.id == res.testimonial.id)], res.testimonial);
    }).send();
}

function editDelete() {
    const t = toRaw(toEdit.value)!!;
    cancel();
    remote.post("testimonial/delete", { id: t.id }).then((res: { testimonial: Testimonial }) => {
        testimonials.value.splice(testimonials.value.findIndex((v) => v.id == t.id), 1);
    }).send();
}

</script>

<template>
    <div class="manager">
        <div class="items">
            <TestimonialHolder v-for="t in testimonials" :testimonial="t" @edit="edit(t)"/>
        </div>

        <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW TESTIMONIAL</Button>

        <TestimonialEditor v-if="toCreate" v-model:testimonial="toCreate" @done="createConfirm" @cancel="cancel">
            Create Testimonial
        </TestimonialEditor>
        <TestimonialEditor v-if="toEdit" v-model:testimonial="toEdit" allow-delete @done="editConfirm" @cancel="cancel" @delete="editDelete">
            Edit Testimonial [{{ toEdit.id }}]
        </TestimonialEditor>
    </div>

</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}
</style>