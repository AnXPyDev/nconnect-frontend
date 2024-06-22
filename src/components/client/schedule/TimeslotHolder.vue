<script setup lang="ts">
import type { Timeslot } from '@/lib/remote/Models';
import { getThumbnailURL } from '@/lib/remote/Util';
import { format, parseISO } from 'date-fns';
import { computed, ref } from 'vue';
import CompanyLink from '@/components/client/speaker/CompanyLink.vue';
import SpeakerShowcase from '../speaker/SpeakerShowcase.vue';
import { useAuth } from '@/stores/auth';
import TimeslotEditor from '@/components/cms/timeslot/TimeslotEditor.vue';
import Button from '@/components/util/Button.vue';
import remote from '@/lib/remote/Remote';
import { predicateByID } from '@/lib/util/Snippets';
import { ApiCodes } from '@/lib/remote/Codes';
import type { FailResponse } from '@/lib/remote/RequestBuilder';

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


const showcase = ref(false);

const auth = useAuth();

const isRegistered = computed(() => {
    const timeslots = auth.user?.timeslots;
    if (!timeslots) {
        return false;
    }
    return timeslots.findIndex((id) => id === props.timeslot.id) !== -1;
});

const canRegister = computed(() => {
    return auth.isUser && props.timeslot.presentation?.allow_registration;
});

const error = ref<string>();

function register() {
    remote.post("user/registertimeslot", { id: props.timeslot.id }).then((res) => {
        auth.user!!.timeslots.push(props.timeslot.id!!);
        props.timeslot.remaining_capacity!! -= 1;
    }).code(ApiCodes.Overlap, (res: FailResponse<{ overlap: Timeslot }>) => {
        error.value = `Už ste v tomto časovom okne prihlásený na prednášku "${ res.overlap.presentation?.name }" !`;
    }).code(ApiCodes.Occupied, (res) => {
        error.value = `Táto prednáška je už plne obsadená!`;
    }).send();
}

function unregister() {
    remote.post("user/unregistertimeslot", { id: props.timeslot.id }).then((res) => {
        auth.user!!.timeslots.splice(auth.user!!.timeslots.findIndex((id) => id === props.timeslot.id), 1);
        props.timeslot.remaining_capacity!! += 1;
    }).send();
}

</script>

<template>

    <div class="timeslot" :class="{ open }">
        <div class="header" @click="emit('open')" :class="{ registered: isRegistered }">
            <div class="time align">
                {{ prettyTime(timeslot.start_at) }} - {{ prettyTime(timeslot.end_at) }}
            </div>
            <div class="name align">
                {{ timeslot.presentation?.name }}
            </div>
            <div v-if="isRegistered" class="registration">
                <i class="fa-solid fa-check"></i>
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
                    <div class="speaker" v-if="timeslot.presentation.speaker">
                        <div v-if="timeslot.stage" class="stage">
                            <span class="strong">STAGE:</span>&nbsp; {{ timeslot.stage.name }}
                        </div>
                        <div @click="showcase=true" class="name">
                            <span class="strong">SPEAKER:</span>&nbsp; {{ timeslot.presentation.speaker.name }}
                        </div>
                        <div class="company">
                            <span class="strong">
                                <CompanyLink :company="timeslot.presentation.speaker.company"/>
                            </span>
                        </div>
                    </div>
                    <div v-if="canRegister" class="registration">
                        <Button v-if="isRegistered" @click="unregister"><i class="fa-solid fa-xmark"></i>&nbsp; ODHLÁSIŤ SA</Button>
                        <Button v-else @click="register"><i class="fa-solid fa-plus"></i>&nbsp; PRIHLÁSIŤ SA</Button>
                        <div v-if="timeslot.presentation.capacity != undefined && timeslot.remaining_capacity != undefined" class="status">
                            OBSADENIE: {{ timeslot.presentation.capacity - timeslot.remaining_capacity }}/{{ timeslot.presentation.capacity }}
                        </div>
                    </div>
                    <span v-if="error" class="error"><i class="fa-solid fa-circle-exclamation"></i>&nbsp; {{ error }}</span>

                </div>
            </div>
            <SpeakerShowcase v-if="timeslot.presentation.speaker && showcase" @close="showcase=false" :speaker="timeslot.presentation.speaker"></SpeakerShowcase>
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
        transition: 0.5s all ease;

        &.registered {
            background-color: var(--clr-primary-1);
            color: var(--clr-fg-on-primary);
            border-bottom: 1px solid var(--clr-primary);
        }

        > div.align {
            padding-left: schedule-table.$align;
        }

        > .time {
            @include schedule-table.time-col;
        }

        > .name {
            text-transform: uppercase;
        }

        > .registration {
            padding-left: 1em;
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

                > .speaker, > .stage {
                    display: flex;
                    gap: 2em;
                    font-weight: 900;
                    .strong {
                        color: var(--clr-fg-strong)
                    }

                    > .name {
                        text-transform: uppercase;
                        cursor: pointer;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }

                > .registration {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .button {
                        --border: solid 1px var(--clr-fg);
                    }
                }

                > .error {
                    color: var(--clr-error);
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