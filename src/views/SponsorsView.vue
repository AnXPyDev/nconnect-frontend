<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue';
import type { Sponsor } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import Spinner from '@/components/util/Spinner.vue';
import SponsorsList from '@/components/client/sponsor/SponsorsList.vue';

const sponsors = ref<Sponsor[]>([]);
const loading = ref<boolean>(true);

remote.post("sponsor/index").then((res: Response<{ sponsors: Sponsor[] }>) => {
    sponsors.value = res.sponsors;
    loading.value = false;
}).send();

</script>

<template>
    
    <PageHeader location="PARTNERI"></PageHeader>

    <div class="content-container">
        <div class="content">
            <Spinner v-if="loading"></Spinner>
            <SponsorsList v-else :sponsors="sponsors"></SponsorsList>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';

.section-header {
    color: var(--clr-primary);
    margin-top: 3em;
    @include media.phone {
        margin-top: 0;
    }
}

.content {
    padding-block: 4em;
}

</style>