<script setup lang="ts">
import { setDocumentTitle } from '@/Router';
import PageDisplay from '@/components/client/page/PageDisplay.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import Spinner from '@/components/util/Spinner.vue';
import { ApiCodes, HttpCodes } from '@/lib/remote/Codes';
import { type Page } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import { RequestFailedError, ResponseHandler, type Response } from '@/lib/remote/RequestBuilder';
import { AxiosError } from 'axios';
import { ref } from 'vue';

enum Errors {
    NOTFOUND, EMPTY, UNKNOWN
};

const props = defineProps<{
    slug: string
}>();

const loading = ref(true);
const page = ref<Page>();

const error = ref<Errors>();

const content = ref<string>();

(async () => {

try {
    const res: Response<{ page: Page }> = await remote.post("resource/pagefromslug", { slug: props.slug }).send();
    const { data }: Response<{ data: string }> =  await remote.get("resource/get", { id: res.page.id!! }).send();

    page.value = res.page;
    content.value = data;

    setDocumentTitle(res.page.name);

} catch (e) {
    error.value = Errors.UNKNOWN;

    if (e instanceof RequestFailedError) {
        await new ResponseHandler().code(ApiCodes.NotFound, () => {
            console.error("NOT FOUND");
            error.value = Errors.NOTFOUND;
        }).handle(e.response);
    } else if (e instanceof AxiosError) {
        console.error(e.response);
        if (e.response?.status == HttpCodes.NOTFOUND) {
            error.value = Errors.EMPTY;
        }
    }
}

loading.value = false;

})();

</script>

<template>
<PageHeader v-if="page?.metadata.showHeader" section="STRÁNKY" :location="page.name"></PageHeader>
<div class="page-view content-container">
    <div class="content">
        <Spinner v-if="loading" />
        <template v-else-if="error !== undefined">
            <div v-if="error == Errors.NOTFOUND" class="error">
                <i class="fa-solid fa-magnifying-glass"></i>&nbsp; stránka sa nenašla
            </div>
            <div v-if="error == Errors.EMPTY" class="error">
                <i class="fa-solid fa-question"></i>&nbsp; stránka je prázdna
            </div>
            <div v-if="error == Errors.UNKNOWN" class="error">
                <i class="fa-solid fa-bug"></i>&nbsp; neznáma chyba
            </div>
        </template>
        <template v-else-if="page">
            <PageDisplay :content="content"/>
        </template>
    </div>
</div>
</template>

<style scoped lang="scss">
.page-view {
    > .content {
        display: flex;
        flex-direction: column;
        align-items: center;

        > .error {
            text-transform: uppercase;
            font-size: 1.5em;
        }
    }
}
</style>