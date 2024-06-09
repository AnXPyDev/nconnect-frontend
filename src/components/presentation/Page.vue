<template>
    <div class="content-container page">
        <div class="background">
            <slot name="background"></slot>
        </div>

        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page {
    position: relative;

    > .background {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    > .content {
        padding-block: 2em;
        z-index: 3;
        height: 100%;
        width: 100%;
    }

    background-color: black;
}
</style>