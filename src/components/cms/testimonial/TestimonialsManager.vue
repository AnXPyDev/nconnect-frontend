<script setup lang="ts">

import { ref, toRaw } from 'vue';
import TestimonialHolder from './TestimonialHolder.vue';
import TestimonialEditor from './TestimonialEditor.vue';
import type { Testimonial } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import Button from '@/components/util/Button.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';

const testimonials = ref<Testimonial[]>([]);
const loading = ref<boolean>(true);

remote.post('testimonial/index').then((res: Response<{ testimonials: Testimonial[] }>) => {
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
    toEdit.value = Object.assign({}, t);
}

function create() {
    reset();
    toCreate.value = {
        author: "",
        description: ""
    };
}

async function createConfirm() {
    const { testimonial }: { testimonial: Testimonial } = await remote.post("testimonial/create", toRaw(toCreate.value)!!).unwrap().send();
    testimonials.value.push(testimonial);
}

async function editConfirm() {
    const { testimonial }: { testimonial: Testimonial } = await remote.post("testimonial/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(testimonials.value.find(predicateByID(testimonial.id!!))!!, testimonial);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("testimonial/delete", { id }).send();
    testimonials.value.splice(testimonials.value.findIndex(predicateByID(id)), 1);
}

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

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW TESTIMONIAL</Button>

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