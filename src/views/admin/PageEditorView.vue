<script setup lang="ts">

import Button from '@/components/util/Button.vue';
import type { Page } from '@/lib/remote/Models';
import { ref } from 'vue';
import router, { setDocumentTitle } from '@/Router';
import PageDisplay from '@/components/client/page/PageDisplay.vue';
import Spinner from '@/components/util/Spinner.vue';
import { ApiCodes, HttpCodes } from '@/lib/remote/Codes';
import remote from '@/lib/remote/Remote';
import { RequestFailedError, ResponseHandler, type Response } from '@/lib/remote/RequestBuilder';
import { AxiosError } from 'axios';
import WYSIWYG from '@/components/cms/page/WYSIWYG.vue';

const props = defineProps<{
    slug: string
}>();

enum Sections {
    EDITOR, PREVIEW
};

const section = ref<Sections>();

const loading = ref(true);
const uploading = ref(false);
const page = ref<Page>();

const content = ref<string>("");

(async () => {

try {
    const res: Response<{ page: Page }> = await remote.post("resource/pagefromslug", { slug: props.slug }).send();
    page.value = res.page;
    setDocumentTitle(res.page.name);

    const { data }: Response<{ data: string }> =  await remote.get("resource/get", { id: res.page.id!! }).send();

    content.value = data;
} catch (e) {
    if (e instanceof RequestFailedError) {
        await new ResponseHandler().code(ApiCodes.NotFound, () => {
            console.error("NOT FOUND");
        }).handle(e.response);
    } else if (e instanceof AxiosError) {
        if (e.response?.status == HttpCodes.NOTFOUND) {
            console.log("Page not found");
        } else {
            console.error("UNKNOW ERROR", e);
        }
    }
}

loading.value = false;
section.value = Sections.EDITOR;

})();

async function confirm() {
    uploading.value = true;
    await remote.put("resource/upload", { id: page.value!!.id, extension: "html" }, content.value).send();
    router.back();
}

function cancel() {
    router.back();
}

</script>

<template>
    <div class="manager content-container">
        <div class="content">
            <Spinner v-if="loading"></Spinner>
            <template v-else-if="page">
                <div class="info">
                    <span class="id">[{{ page.id }}]</span>
                    <span class="name">{{ page.name }}</span>
                    <span class="path">pages/{{ page.metadata.slug }}</span>
                </div>

                <div class="bottom">
                    <div class="nav">
                        <Button @click="section = Sections.EDITOR" :active="section == Sections.EDITOR">EDIT</Button>
                        <Button @click="section = Sections.PREVIEW" :active="section == Sections.PREVIEW">PREVIEW</Button>
                    </div>
                    <div class="controls">
                        <Button :enabled="!uploading" @click="confirm"><i class="fa-solid fa-check"></i>&nbsp; CONFIRM</Button>
                        <Button :enabled="!uploading" @click="cancel"><i class="fa-solid fa-xmark"></i>&nbsp; CANCEL</Button>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div v-if="section == Sections.EDITOR" class="page-editor content-container">
        <div class="content">
            <WYSIWYG class="wysiwyg" v-model="content"></WYSIWYG>
        </div>
    </div>
    <div v-if="section == Sections.PREVIEW" class="page-preview content-container">
        <div class="content">
            <PageDisplay v-if="section == Sections.PREVIEW" :content="content"></PageDisplay>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/dimens';

.content-container {
    padding-block: 1em;
}

.manager {
    > .content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.5em;

        > .info {
            display: flex;
            align-items: center;
            gap: 0.5em;
            font-size: 1.2em;

            > .path {
                font-style: italic;
            }

            > .id {
                font-size: 0.8em;
                opacity: 80%;
            }

        }

        > .bottom {
            display: flex;
            justify-content: space-between;

            > div {
                display: flex;
                align-items: center;
                justify-content: start;
            }
        }
    }
}

.page-editor, .page-preview {
    background-color: var(--clr-bg-1);
}


.page-editor {
    > .content {
        > .wysiwyg {
            @include dimens.min-max(width, 100%);
            min-height: 75vh;
            height: fit-content;
        }
    }
}

.page-preview {

}
</style>
