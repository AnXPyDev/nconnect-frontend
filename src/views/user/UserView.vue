<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import Button from '@/components/util/Button.vue';
import { logoutUser } from '@/lib/remote/Auth';
import router from '@/Router';
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import UserSchedule from '@/components/client/userschedule/UserSchedule.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import ConfirmDialog from '@/components/util/ConfirmDialog.vue';

const auth = useAuth();
const loading = ref(false);


async function logout() {
    await logoutUser();
    router.push({ name: "home" });
}

function unregister() {
    loading.value = true;
    remote.post("user/unregister").then(async (res) => {
        loading.value = false;
        await logoutUser();
        router.push({ name: "home" });
    }).send();

}

const askUnregister = ref(false);

</script>

<template>
    <div class="content-container">
        <div class="content">

            <div class="header">
                <div class="controls">
                    <Button @click="askUnregister=true"><i class="fa-solid fa-door-open"></i>&nbsp; Zrušiť registráciu</Button>
                    <Button @click="logout"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Odhlásiť sa</Button>
                </div>
            </div>

            <PageSectionHeader class="section-header">moje prednášky</PageSectionHeader>

            <UserSchedule class="schedule"></UserSchedule>

            <RouterLink :to="{ name: 'schedule' }"><Button class="add-button"><i class="fa-solid fa-plus"></i>&nbsp; PRIDAŤ PREDNÁŠKY</Button></RouterLink>



        </div>
    </div>

    <ConfirmDialog v-if="askUnregister" @yes="unregister" @no="askUnregister=false">Naozaj chceťe zrušiť registráciu na konferenciu?</ConfirmDialog>

</template>

<style scoped lang="scss">

.content {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1em;

    > .header {
        width: 100%;
        display: flex;
    
        justify-content: end;

        > .controls {
            display: flex;
            text-transform: uppercase;
        }

    }

    > .section-header {
        color: var(--clr-primary);
    }

    .add-button {
        border: solid 1px var(--clr-fg);
    }
}

</style>