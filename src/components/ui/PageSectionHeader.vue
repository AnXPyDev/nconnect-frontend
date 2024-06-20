<template>
    <div class="page-section-header">
        <div class="bar"></div>
        <div class="title">
            <slot></slot>
        </div>
    </div>

</template>

<style scoped lang="scss">
.page-section-header {
    display: flex;
    gap: 0.4em;
    align-items: center;
    
    font-size: 1.5em;

    > .bar {
        height: 0.75em;
        width: 2px;
        background-color: currentColor;
    }

    > .title {
        text-transform: uppercase;
        font-weight: 900;
    }
}
</style>