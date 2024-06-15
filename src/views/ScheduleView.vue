<script setup lang="ts">
import Schedule from '@/components/client/schedule/ScheduleTable.vue';
import PageHeader from '@/components/ui/PageHeader.vue';

</script>

<template>
    <PageHeader location="PROGRAM"></PageHeader>

    <div class="content-container">
        <div class="content">
            <Schedule></Schedule>
        </div>
    </div>

</template>

<style scoped lang="scss">

.content {
    padding-block: 4em;
}

</style>