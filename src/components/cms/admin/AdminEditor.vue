<script setup lang="ts">
import { ref, watch } from 'vue';
import { AdminPriv, type Admin, type Stage } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import ImageResourceSelector from '@/components/cms/gallery/ImageResourceSelector.vue';
import ContactEditor from '@/components/cms/contact/ContactEditor.vue';
import InputPassword from '@/components/util/input/InputPassword.vue';
import InputAbstract from '@/components/util/input/InputAbstract.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
    privOnly?: boolean
}>();

const admin = defineModel<Admin>({ required: true });

const emit = defineEmits<{
    done: []
}>();

const password2 = ref<string>(admin.value.password ?? "");

function validate() {
    if (!props.privOnly) {
        if (admin.value.username.length == 0) {
            return "Username name empty";
        }

        if (admin.value.password!!.length == 0) {
            return "Password is empty";
        }

        if (admin.value.password != password2.value) {
            return "Passwords do not match";
        }
    }


    return true;
}



</script>

<template>
    <Editor @done="emit('done')" v-bind="{ validate, confirm, delete_ }">
        <template #title><slot></slot></template>
        <template #items>
            <template v-if="!privOnly">
                <Input v-model="admin.username">Username</Input>
                <InputPassword v-model="admin.password">Password</InputPassword>
                <InputPassword v-model="password2">Repeat Password</InputPassword>
            </template>
            <InputAbstract>
                <template #label>Priv</template>
                <template #default>
                    <select v-model.number="admin.priv">
                        <option :value="AdminPriv.VIEW">[0] VIEW</option>
                        <option :value="AdminPriv.EDIT">[0] EDIT</option>
                        <option :value="AdminPriv.SUPER">[0] SUPER</option>
                    </select>
                </template>
            </InputAbstract>
        </template>
    </Editor>
</template>