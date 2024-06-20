<script setup lang="ts">
import { ref } from 'vue';
import StagesList from './StagesList.vue';
import TimeslotsList from './TimeslotsList.vue';

const selectedStage = ref<number>();

</script>

<template>

<div class="schedule-table">
    <div class="left section">
        <div class="header">
            <div>STAGE</div>
        </div>
        <StagesList @select="(id) => { selectedStage = id; }" :selected="selectedStage" class="stages-list"></StagesList>
    </div>
    <div class="right section">
        <div class="header">
            <div>ČAS</div>
            <div>PREDNÁŠKA</div>
        </div>
        <TimeslotsList class="timeslots-list" v-if="selectedStage" :key="selectedStage" :stage_id="selectedStage"></TimeslotsList>
    </div>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/schedule-table';
@use '@/styles/lib/media';

.schedule-table {
    display: flex;
    background-color: var(--clr-primary);
    color: var(--clr-fg-on-primary);

    @include media.phone {
        flex-direction: column;
    }

    > .section {
        display: flex;
        flex-direction: column;

        &.left {
            min-width: 15em;

            > .stages-list {
                width: 100%;
            }
        }

        &.right {
            flex-grow: 1;

            > .timeslots-list {
                flex-grow: 1;
            }
        }

        &.right > .header {
            > div:nth-child(1) {
                @include schedule-table.time-col;
            }

            > div:nth-child(2) {
                width: 100%;
            }
        }

        > .header {
            height: schedule-table.$row-height;
            display: flex;
            align-items: center;
            font-weight: 900;
            > div {
                padding-left: schedule-table.$align;
            }
        }
    }

}

</style>