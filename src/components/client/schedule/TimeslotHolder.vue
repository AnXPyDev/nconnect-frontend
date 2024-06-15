<script setup lang="ts">
import type { Timeslot } from '@/lib/remote/Models';
import { getThumbnailURL } from '@/lib/remote/Util';
import { format, parseISO } from 'date-fns';
import { computed } from 'vue';
import CompanyLink from '@/components/client/speaker/CompanyLink.vue';

const props = defineProps<{
    timeslot: Timeslot
    open: boolean
}>();

const emit = defineEmits<{
    open: []
}>();

const prettyTimeFmt = "HH:mm";

function prettyTime(date?: string) {
    if (date === undefined) {
        return "??:??";
    }
    return format(parseISO(date), prettyTimeFmt);
}

const imageURL = computed(() => {
    const presentation = props.timeslot.presentation!!;
    return getThumbnailURL(presentation.image_id ?? presentation.speaker?.image_id);
});

</script>

<template>

    <div class="timeslot" :class="{ open }">
        <div class="header" @click="emit('open')">
            <div class="time">
                {{ prettyTime(timeslot.start_at) }} - {{ prettyTime(timeslot.end_at) }}
            </div>
            <div class="name">
                {{ timeslot.presentation?.name }}
            </div>
        </div>
        <div v-if="timeslot.presentation" class="presentation">
            <div class="inner">
                <div class="left">
                    <img :src="imageURL" />
                </div>
                <div class="right">
                    <div class="description">
                        {{ timeslot.presentation.description }}
                    </div>
                    <div class="bottom" v-if="timeslot.presentation.speaker">
                        <div class="name">
                            <span class="strong">SPEAKER:</span>&nbsp; {{ timeslot.presentation.speaker.name }}
                        </div>
                        <div class="company">
                            <span class="strong">
                                <CompanyLink :company="timeslot.presentation.speaker.metadata.company"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/schedule-table';

.timeslot {
    display: flex;
    flex-direction: column;
    background-color: var(--clr-bg-1);
    transition: 0.5s ease all;

    > .header {
        cursor: pointer;
        font-weight: 900;
        display: flex;
        align-items: center;
        height: schedule-table.$row-height;
        border-bottom: 1px solid var(--clr-bg-2);

        > div {
            padding-left: schedule-table.$align;
        }

        > .time {
            @include schedule-table.time-col;
        }

        > .name {
            text-transform: uppercase;
        }
    }

    > .presentation {
        display: grid;
        grid-template-rows: 0fr;
        transition: inherit;
        > .inner {
            overflow: hidden;
            display: flex;

            > div {
                padding-left: schedule-table.$align;
            }

            > .left {
                @include schedule-table.time-col;

                > img {
                    width: 100%;
                    aspect-ratio: 3/4;
                    object-fit: cover;
                }
            }

            > .right {
                display: flex;
                flex-direction: column;
                gap: 1em;
                padding-right: 4em;
                line-height: 2em;

                > .bottom {
                    display: flex;
                    gap: 2em;
                    font-weight: 900;
                    .strong {
                        color: var(--clr-fg-strong)
                    }

                    > .name {
                        text-transform: uppercase;
                    }
                }

            }
        }
    }

    &.open {
        background-color: var(--clr-bg);

        > .presentation {
            grid-template-rows: 1fr;
            padding-block: 2em;
        }
    }
}

</style>