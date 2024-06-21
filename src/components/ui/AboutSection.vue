<script setup lang="ts">
import remote from '@/lib/remote/Remote';
import { type Qna } from '@/lib/remote/Models';
import { ref } from 'vue';
import type { Response } from '@/lib/remote/RequestBuilder';
import { useState } from '@/stores/state';
import Spinner from '../util/Spinner.vue';

const state = useState();

const loading = ref<boolean>(true);
const qnas = ref<Qna[]>([]);

remote.post("qna/index").then((res: Response<{ qnas: Qna[] }>) => {
    qnas.value = res.qnas;
    loading.value = false;
}).send();

</script>

<template>
    <div class="about">
        <div class="left">
            <img src="@/assets/images/about-logo.jpg"/>
        </div>
        <div class="right">
            <div class="title">{{ state.conference!!.about_title }}</div>
            <div class="about">{{ state.conference!!.about_text }}</div>
            <div class="qnas">
                <Spinner v-if="loading"></Spinner>
                <div v-else v-for="qna in qnas" class="qna">
                    <div class="title">{{ qna.question }}</div> 
                    <div class="answer">{{ qna.answer }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';

.about {
    $gap: 2em;
    display: flex;
    gap: $gap;

    @include media.phone {
        flex-direction: column;
    }

    > .left, > .right {
        width: calc((100% - $gap) / 2);

        @include media.phone {
            width: 100%;
        }
    }

    > .left {
        > img {
            width: 100%;
        }
    }

    > .right {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 1em;

        > .title {
            text-transform: uppercase;
            font-weight: 900;
            font-size: 1.4em;
        }

        > .about {
            line-height: 2em;
        }

        > .qnas {
            $gap: 1em;
            display: flex;
            flex-wrap: wrap;
            gap: $gap;

            > .qna {
                @include mixins.card-shadow;
                width: calc((100% - $gap) / 2);
                padding: 1em;
                background-color: var(--clr-bg);
                display: flex;
                flex-direction: column;
                gap: 0.5em;

                > .title {
                    text-transform: uppercase;
                    font-weight: 900;
                    font-size: 1.1em;
                }

            }
        }
    }
}
</style>