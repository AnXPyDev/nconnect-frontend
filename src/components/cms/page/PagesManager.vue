<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Page } from '@/lib/remote/Models';
import PageEditor from './PageEditor.vue';
import PageHolder from './PageHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import router from '@/Router';

const pages = ref<Page[]>([]);

const loading = ref<boolean>(true);

remote.post("resource/pages").then((response: Response<{ pages: Page[] }>) => {
    pages.value = response.pages;
    loading.value = false;
}).send();

const toCreate = ref<Page>();
const toEdit = ref<Page>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = { 
        name: "",
        type: "page",
        metadata: {
            slug: "",
            showHeader: true
        }
    };
}

function edit(page: Page) {
    reset();
    toEdit.value = structuredClone(toRaw(page));
}

async function editConfirm() {
    const { resource: page }: { resource: Page } = await remote.post("resource/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(pages.value.find(predicateByID(page.id!!))!!, page);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("resource/delete", { id }).send();
    pages.value.splice(pages.value.findIndex(predicateByID(id)), 1);
}

async function createConfirm() {
    const { resource: page }: { resource: Page } = await remote.post("resource/create", toRaw(toCreate.value)!!).unwrap().send();
    pages.value.push(page);
}

function editContent(page: Page) {
    router.push({ name: "admin/cms/page", params: { slug: page.metadata.slug } });
}

function show(page: Page) {
    router.push({ name: "page", params: { slug: page.metadata.slug } });
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else>
            <div class="items">
                <PageHolder v-for="page in pages" :page="page" :key="page.id" @show="show(page)" @edit="edit(page)" @edit-content="editContent(page)"/>
            </div>

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW PAGE</Button>

            <PageEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit page [{{ toEdit.id }}]
            </PageEditor>
            <PageEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create page
            </PageEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>