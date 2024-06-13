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
    --color: var(--clr-primary);

    display: flex;
    gap: 0.4em;
    padding-block: 1em;
    align-items: center;

    color: var(--color);
    
    font-size: 1.5em;

    > .bar {
        height: 0.75em;
        width: 2px;
        background-color: var(--color);
    }

    > .title {
        font-weight: 900;
    }
}
</style>