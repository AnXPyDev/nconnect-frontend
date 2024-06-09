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
            <div class="timeslot">
                <div class="time col2">08:30 - 09:00</div>
                <div class="title col3">registrácia</div>
            </div>
            <div class="timeslot">
                <div class="time col2">09:00 - 09:15</div>
                <div class="title col3">otvorenie</div>
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
                padding-block: 1.2em;
                font-weight: 900;

                > .time {
                    padding-inline: 2em;
                }

                > .title {
                    padding-inline: 2em;
                    text-transform: uppercase;
                }

                border-bottom: 1px solid var(--clr-bg-2);
                transition: 0.5s all ease;

                &:hover, &.active {
                    background-color: var(--clr-bg);
                }
            }

        }
    }
}

</style>