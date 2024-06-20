<script setup lang="ts">

import type { Organizer } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import OrganizerList from '@/components/client/organizer/OrganizerList.vue';
import Spinner from '@/components/util/Spinner.vue';
import PageSectionHeader from './PageSectionHeader.vue';
import { useState } from '@/stores/state';

const state = useState();

const organizers = ref<Organizer[]>([]);
const loading = ref<boolean>(true);


remote.post('organizer/index').then((res: Response<{ organizers: Organizer[] }>) => {
    organizers.value = res.organizers;
    loading.value = false;
}).send();

</script>

<template>
    <div class="content-container">
        <div class="content">
            <div class="map">
                <iframe :src="state.conference!!.location_map_embed" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="organizers">
                <PageSectionHeader class="header">KONTAKT</PageSectionHeader>

                <Spinner v-if="loading"></Spinner>
                <OrganizerList v-else :organizers="organizers"></OrganizerList>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/dimens';
@use '@/styles/lib/mixins';
@use '@/styles/lib/media';

.content-container {
    padding-block: dimens.$section-padding;

    > .content {
        display: flex;
        align-items: start;
        gap: 1em;

        @include media.phone {
            flex-direction: column;
        }

        > .map {
            @include dimens.min-max(width, 70%);
            aspect-ratio: 3/2;

            @include media.phone {
                aspect-ratio: 2/3;
            } 

            > iframe {
                width: 100%;
                height: 100%;
                border: none;
            }

            @include media.phone {
                @include dimens.min-max(width, 100%);
            }
        }

        > .organizers {
            display: flex;
            flex-direction: column;
            gap: 2em;
            width: 100%;
            @include mixins.card-shadow;
            background-color: var(--clr-bg);
            padding: 2em;

            > .header {
                color: var(--clr-primary);
            }
        }
    }
}


</style>