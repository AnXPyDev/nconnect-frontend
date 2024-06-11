<script setup lang="ts">
import { ref } from 'vue';

</script>


<template>

<div class="schedule">
    <div class="header">
        <div class="col1">
            STAGE
        </div> 
        <div class="col2">
            ČAS
        </div>

        <div class="col3">
            PREDNÁŠKA
        </div>
    </div>

    <div class="bottom">
        <div class="stages col1">
            <div class="stage selected">
                <span class="title">SOFT DEVS STAGE</span>
                <span class="date">14. MAREC</span>
            </div>
            <div class="stage">
                <span class="title">AI&DATA STAGE</span>
                <span class="date">14. MAREC</span>
            </div>
        </div>
        <div class="timeslots">
            <div v-for="i in [0,1,2]" ref="timeslotRefs" class="timeslot active">
                <div class="header">
                    <div class="time col2">08:30 - 09:00</div>
                    <div class="title col3">registrácia</div>
                </div>
                <div class="details">
                    <div class="inner">
                        <div class="col2">

                        </div>
                        <div class="col3">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum eius repellendus repudiandae omnis esse sapiente, ipsa unde, ab alias cumque voluptate assumenda consequatur perspiciatis. Ab perspiciatis quos dolore fugiat mollitia!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

</template>

<style scoped lang="scss">

.schedule {
    background-color: var(--clr-primary);
    color: var(--clr-fg-on-primary);
    width: 100%;

    .col1 {
        width: 18em;
        min-width: 18em;
        max-width: 18em;

    }

    .col2 {
        min-width: 12em;
        width: 12em;
        max-width: 18em;
    }

    .col3 {
        width: 100%;
    }

    > .header {
        display: flex;
        width: 100%;

        > div {
            padding: 1.5em;
            padding-inline: 2em;
            font-weight: 900;
        }
    }

    > .bottom {
        display: flex;
        width: 100%;

        > .stages {
            > .stage {
                padding: 1em;
                padding-inline: 2em;
                font-weight: 900;
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                transition: 0.5s all ease;
                &.selected, &:hover {
                    background-color: var(--clr-primary-1);
                }
            }
        }

        > .timeslots {
            width: 100%;
            min-height: 100%;
            background-color: var(--clr-bg-1);
            color: var(--clr-fg);

            > .timeslot {
                width: 100%;
                display: flex;
                flex-direction: column;
                font-weight: 900;

                > .header {
                    cursor: pointer;
                    display: flex;
                    padding-block: 1.2em;

                    > .time {
                        padding-inline: 2em;
                    }

                    > .title {
                        padding-inline: 2em;
                        text-transform: uppercase;
                    }


                    &:hover, &.active {
                        background-color: var(--clr-bg);
                    }
                }

                > .details {
                    transition: 0.5s all ease;
                    width: 100%;
                    overflow: hidden;

                    display: grid;
                    grid-template-rows: 1fr;

                    > .inner {
                        overflow: hidden;
                        display: flex;

                        > div {
                            padding-block: 1em;
                            padding-inline: 2em;
                        }
                    }

                    &.hidden {
                        grid-template-rows: 0fr;
                    }
                }

                border-bottom: 1px solid var(--clr-bg-2);
                transition: 0.5s all ease;

            }

        }
    }
}

</style>