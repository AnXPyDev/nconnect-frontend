<template>

<div class="headliner-card">

    <div class="left">
        <img src="https://nconnect.sk/images/speakers/Gymbeam.jpg"/>
        <div class="overlay">
            <div class="links">
                <i class="icon-button fa-brands fa-instagram"></i>
                <i class="icon-button fa-brands fa-facebook"></i>
            </div>
        </div>

    </div>

    <div class="right">
        <div class="stage">AI&DATA STAGE</div>
        <div class="name">DALIBOR CICMAN</div>
        <div class="description">
Zakladateľ a CEO GymBeam, od roku 2014 transformoval trh so športovou výživou na e-commerce platformu pôsobiacu v 16 krajinách s ročnými tržbami presahujúcimi 100 miliónov Eur.
        </div>
        <span class="about-link">Viac o mne</span>
    </div>

</div>

</template>

<style scoped lang="scss">
.headliner-card {
    display: flex;

    height: 400px;

    > div {
        width: 50%;
        height: 100%;
    }

    > .right {
        display: flex;
        flex-direction: column;
        align-items: start;

        padding: 2em;

        > div {
            margin-bottom: 0.5em;
        }

        > .name {
            font-size: 1.5em;
            font-weight: 700;
            color: var(--clr-primary);
        }

        > .description {
            line-height: 1.75em;
        }

        > .about-link {
            cursor: pointer;
            color: var(--clr-primary);

            &:hover {
                text-decoration: underline;
            }
        }
    }

    > .left {
        position: relative;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        > .overlay {
            position: absolute;
            top: 0;
            left: 0;
            transform: scale(0);
            width: 100%;
            height: 100%;
            background-color: var(--clr-primary-1);

            display: flex;
            justify-content: center;
            align-items: center;
            visibility: hidden;
            opacity: 0%;
            transition: 0.5s all ease;

            color: var(--clr-fg-on-primary);

            > .links {
                display: flex;
                gap: 1em;
                align-items: center;
                font-size: 1.2em;

                > .icon-button {
                    opacity: 80%;
                    transition: 0.25s all ease;

                    &:hover {
                        cursor: pointer;
                        opacity: 100%;
                    }
                }
            }
        }

    }

    &:hover {
        > .left > .overlay {
            visibility: visible;
            opacity: 100%;
            transform: scale(1);
        }  
    }
}

</style>