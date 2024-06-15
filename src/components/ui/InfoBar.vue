<script setup lang="ts">
import MailLink from './misc/MailLink.vue';
import PhoneLink from './misc/PhoneLink.vue';
</script>

<template>
    <div class="info-bar content-container">
        <div class="content">
            <div class="left">
                <span><i class="fa-solid fa-location-dot"></i>&nbsp; Študentské centrum UKF, Dražovská 2, Nitra</span>
            </div>

            <div class="right">
                <PhoneLink/>
                &nbsp;&nbsp;
                <MailLink/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .info-bar {
        background-color: var(--clr-primary);
        color: var(--clr-fg-on-primary);
        padding-block: 0.5em;

        > .content {
            display: flex;
            justify-content: space-between;
        }
    }
</style>