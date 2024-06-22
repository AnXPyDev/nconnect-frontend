<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue';
import { type Page } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Spinner from '@/components/util/Spinner.vue';

const loading = ref(true);
const pages = ref<Page[]>([]);

remote.post("resource/pages").then((res: Response<{ pages: Page[] }>) => {
    pages.value = res.pages;
    loading.value = false;
}).send();

</script>

<template>
    <PageHeader location="STRÁNKY"></PageHeader>

    <div class="content-container">
        <div class="content">
            <Spinner v-if="loading"/>
            <RouterLink v-else class="router-link" v-for="page in pages" :to="{ name: 'page', params: { slug: page.metadata.slug } }">
                {{ page.name }}
            </RouterLink>
        </div>
    </div>

</template>

<style scoped lang="scss">

.content {
    padding-block: 4em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    > .router-link {
        font-size: 1.2em;
        color: var(--clr-primary);

        &:hover {
            text-decoration: underline;
        }
    }
}

</style>