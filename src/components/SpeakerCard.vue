<template>
    <div class="speaker-card">
        <div class="top">
            <div class="image">
                <img src="https://nconnect.sk/images/speakers/Gymbeam.jpg"/>
            </div>
            <div class="overlay">
                <div class="description">
                    <div class="text">
Zakladateľ a CEO GymBeam, od roku 2014 transformoval trh so športovou výživou na e-commerce platformu pôsobiacu v 16 krajinách s ročnými tržbami presahujúcimi 100 miliónov Eur.

Ako nositeľ ocenení Forbes "30 pod 30" a YT Podnikateľ roka 2024, Dalibor presadzuje význam dátovo riadeného prístupu, inovačnej kultúry a tímovej spolupráce pri budovaní značky.
                    </div>
                    <div class="controls">
                        <span class="about-link">Viac o mne</span>
                    </div>
                </div>

                <div class="tag">
                    <a>GymBeam</a>
                </div>

                <div class="links">
                    <i class="icon-button fa-brands fa-instagram"></i>
                    <i class="icon-button fa-brands fa-facebook"></i>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span>DALIBOR CICMAN</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .speaker-card {
        $pad: 0.5rem;
        $sidew: 2rem;

        aspect-ratio: 3/4;

        border: solid 1px black;

        display: flex;
        flex-direction: column;

        > .bottom {
            flex-grow: 1;
            padding: 0.5em;
            color: var(--clr-primary);
            font-weight: 900;
            padding: 1.5em;
        }

        > .top {
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;

            > div {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
            }

            > .image {
                > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            > .overlay {
                background-color: var(--clr-primary-1);
                visibility: hidden;
                opacity: 0%;
                left: 100%;

                
                & {
                    transition: 0.5s all ease;
                }

                > div {
                    transition: 0.5s all ease;
                    transition-delay: 0.4s;
                }

                > .description {
                    position: absolute;
                    padding: 1.5em;
                    top: calc(-2 * $pad);
                    left: calc(-2 * $pad);
                    width: calc(100% - 3 * $pad - $sidew);
                    max-height: calc(100% - 3 * $pad - $sidew);
                    background-color: var(--clr-bg);
                    opacity: 0%;

                    display: flex;
                    flex-direction: column;

                    > .text {
                        line-height: 1.5em;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    > .controls {
                        width: 100%;
                        flex-grow: 1;
                        height: 1em;
                        box-shadow: 0px 0px 0.5em 1em var(--clr-bg);
                        > .about-link {
                            cursor: pointer;
                            color: var(--clr-primary);

                            &:hover {
                                text-decoration: underline;
                            }

                        }
                    }
                }

                > .tag {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    left: $pad;
                    bottom: calc(-1 * $sidew - $pad);
                    height: $sidew;
                    opacity: 0%;
                }

                > .links {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    padding-block: 0.5em;
                    gap: 1em;
                    align-items: center;
                    right: calc(-1 * $pad - $sidew);
                    top: $pad;
                    width: $sidew;
                    font-size: 1.2em;
                    opacity: 0%;

                    > .icon-button {
                        opacity: 80%;
                        transition: 0.25s all ease;

                        &:hover {
                            cursor: pointer;
                            opacity: 100%;
                        }
                    }
                }

                > .tag, > .links {
                    color: var(--clr-fg-on-primary);
                }
            }


        }

        &:hover {
            > .top > .overlay {
                visibility: visible;
                opacity: 100%;
                left: 0%;

                > .description {
                    top: $pad;
                    left: $pad;
                    opacity: 100%;
                }

                > .tag {
                    bottom: $pad;
                    opacity: 100%;
                }

                > .links {
                    right: $pad;
                    opacity: 100%;
                }
            }
        }
    }
</style>