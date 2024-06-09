<script setup lang="ts">
import SpeakerCard from '@/components/SpeakerCard.vue';
import HeadlinerCard from '@/components/HeadlinerCard.vue';
import WelcomePresentation from '@/components/WelcomePresentation.vue';
import { AuthType } from '@/lib/Bridge';
import { useAuth } from '@/stores/auth';
import Testimonials from '@/components/Testimonials.vue';
import Schedule from '@/components/Schedule.vue'; 

const auth = useAuth();
</script>

<template>

    <div class="content-container">
        <div class="content">
            <h1>Home</h1>

            <Schedule></Schedule>
        </div>
    </div>

</template>

<style scoped lang="scss">
.speakers {
    display: flex;
    justify-content: space-between;
    $gap: 0.5em;
    gap: $gap;

    > div {
        width: calc(100% / 2 - 1 * $gap);
        box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.75);
    }

    padding-bottom: 2em;
}
</style>