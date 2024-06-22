<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import Button from '@/components/util/Button.vue';
import { logoutUser } from '@/lib/remote/Auth';
import router from '@/Router';
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import TimeslotHolder from '@/components/client/schedule/TimeslotHolder.vue';
import UserSchedule from '@/components/client/userschedule/UserSchedule.vue';

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

</script>

<template>
    <div class="content-container">
        <div class="content">

            <UserSchedule class="schedule"></UserSchedule>

            <div class="controls">
                <Button @click="unregister"><i class="fa-solid fa-door-open"></i>&nbsp; Zrušiť registráciu</Button>
                <Button @click="logout"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Odhlásiť sa</Button>
            </div>


        </div>
    </div>

</template>

<style scoped lang="scss">

.content {
    display: flex;
    gap: 1em;
    justify-content: space-between;

    > .schedule {
    }

    > .controls {
        flex-grow: 2;
    }
}

</style>