<script setup lang="ts">
import MailLink from './misc/MailLink.vue';
import PhoneLink from './misc/PhoneLink.vue';
</script>

<template>
    <div class="footer content-container">
        <div class="content">
            <div class="section">
                <RouterLink to="/"><img class="logo" src="@/assets/images/nconnect-text-white.svg"/></RouterLink>
                <span>Spájame IT komunity</span>
                <div class="links">
                    <a class="icon-button" target="_blank" href="https://www.facebook.com/nconnectsk/"><i class="fa-brands fa-facebook"></i></a>
                    <a class="icon-button" target="_blank" href="https://www.instagram.com/nconnect_sk/"><i class="fa-brands fa-instagram"></i></a>
                    <a class="icon-button" target="_blank" href="https://www.linkedin.com/company/nconnectsk/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
            <div class="section">
                <span><i class="fa-solid fa-location-dot"></i>&nbsp; Študentské centrum UKF Dražovská 2, Nitra</span>
                <MailLink/>
                <PhoneLink/>
            </div>
            <div class="section">
                <a class="link"><i class="fa-solid fa-graduation-cap"></i>&nbsp; Fakulta prírodných vied a informatiky UKF v Nitre</a>
                <RouterLink to="/" class="link"><i class="fa-solid fa-user-lock"></i>&nbsp; Ochrana osobných údajov</RouterLink>
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

                > .icon-button {
                    opacity: 75%;
                    transition: 0.5s all ease;

                    &:hover {
                        opacity: 100%;
                    }
                }

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