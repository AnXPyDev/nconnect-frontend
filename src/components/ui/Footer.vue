<script setup lang="ts">
import MailLink from './misc/MailLink.vue';
import PhoneLink from './misc/PhoneLink.vue';
import Link from './misc/Link.vue';
import { useState } from '@/stores/state';
import type { Contact } from '@/lib/remote/Models';
import ContactIcons from '../client/util/ContactIcons.vue';
import { defaultContact, defaultLocationFull, defaultSubtitle } from '@/lib/fallbackData';
import LocationLink from './misc/LocationLink.vue';

const state = useState();


</script>

<template>
    <div class="footer content-container">
        <div class="content">
            <div class="section">
                <RouterLink to="/"><img class="logo" src="@/assets/images/nconnect-text-white.svg"/></RouterLink>
                <span>{{ state.conference?.subtitle ?? defaultSubtitle }}</span>
                <ContactIcons class="links" :ignore="['phone', 'email']" :contact="state.conference?.contact ?? defaultContact"></ContactIcons>
            </div>
            <div class="section">
                <LocationLink/>
                <MailLink/>
                <PhoneLink/>
            </div>
            <div class="section">
                <Link href="https://www.fpvai.ukf.sk/sk/"><i class="fa-solid fa-graduation-cap"></i>&nbsp; Fakulta prírodných vied a informatiky UKF v Nitre</Link>
                <RouterLink to="/page/privacy" class="link"><i class="fa-solid fa-user-lock"></i>&nbsp; Ochrana osobných údajov</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@use '@/styles/lib/media';

.footer {
    background-color: var(--clr-bg-inv-1);
    color: var(--clr-fg-inv);
    padding-block: 3em;

    > .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2em;

        @include media.phone {
            align-items: start;
            flex-direction: column;
        }
        
        > .section {
            display: flex;
            flex-direction: column;
            gap: 1em;

            .logo {
                height: 1em;
            }

            > .links {
                display: flex;
                font-size: 1.2em;
                gap: 0.75em;
            }

            > .link {
                &:hover {
                    text-decoration: underline;
                }
            }

        }
    }
}
</style>