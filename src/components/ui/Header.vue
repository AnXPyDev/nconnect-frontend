<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import Navigation from './Navigation.vue';
import Button from '@/components/util/Button.vue'; 
import { ref } from 'vue';
import UserAuth from '@/components/user/UserAuth.vue';
import { useState } from '@/stores/state';
import { Theme } from '@/lib/theme/Theme';

const auth = useAuth();
const state = useState();

const phoneNavigationActive = ref<boolean>(false);

function togglePhoneNavigation() {
    phoneNavigationActive.value = !phoneNavigationActive.value;
}

</script>

<template>
    <div class="header-container">
        <div class="header content-container">
            <div class="content">
                <div class="left">
                    <RouterLink :to="{ name: 'home' }">
                        <img v-if="state.theme == Theme.Dark" src="@/assets/images/header-logo-dark.svg"/>
                        <img v-else src="@/assets/images/header-logo.svg"/>
                    </RouterLink>
                </div>
                <div class="right">
                    <UserAuth class="user-auth" v-if="auth.isUser"></UserAuth>
                    <Button @click="togglePhoneNavigation" class="menu-button" :active="phoneNavigationActive">
                        <i class="fa-solid fa-bars"></i>
                    </Button>
                </div>


                <Navigation class="navigation" />
            </div>
        </div>
        <div class="phone-navigation" :class="{ active: phoneNavigationActive }">
            <div class="inner">
                <Navigation class="navigation" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
@use '@/styles/lib/media';

.header-container {
    position: relative;

    > .phone-navigation {
        display: none;
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 15;
        background-color: var(--clr-bg);
        padding-inline: 1em;

        > .inner {
            overflow: hidden;
            > .navigation {
                width: 100%;
            }
        }


        grid-template-rows: 0fr;
        transition: 0.5s all ease;

        &.active {
            grid-template-rows: 1fr;
            padding-bottom: 1em;
        }

        @include media.phone {
            display: grid;
        }
    }

    .header {
        background-color: var(--clr-bg);
        color: var(--clr-fg);
        padding-block: 2em;

        @include media.phone {
            padding-block: 1em;
        }

        > .content {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;

            gap: 0.5em;

            @include media.phone {
                gap: 1em;

                &:has(> .right > .user-auth) {
                    flex-direction: column;

                    > .right {
                        width: 100%;
                        justify-content: space-between;
                    }
                }

                > .navigation {
                    display: none;
                }
            }

            > .left {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                gap: 1em;

                img {
                    max-height: 2.5em;
                    @include media.small-width {
                        max-height: 2em;
                    }

                }

                @include media.phone {
                    width: 100%;
                }


            }

            > .navigation {
                @include media.small-width {
                    font-size: 0.8em;
                }
            }

            > .right {
                display: flex;
                align-items: center;
                gap: 1em;

                > .menu-button {
                    font-size: 1.5em;
                    display: none;
                    @include media.phone {
                        display: flex;
                    }
                }
            }

        }
    }
}
</style>

