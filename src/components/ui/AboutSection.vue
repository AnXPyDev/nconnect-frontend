<template>
    <div class="about">
        <div class="left">
            <img src="@/assets/images/about-logo.jpg"/>
        </div>
        <div class="right">
            <div class="title">
                Pár slov o konferencii nConnect
            </div>
            <div class="about">
                Po mnohých rokoch premýšľania a plánovania sme vytvorili nConnect, jedinečnú udalosť v Nitre, ktorá spája študentov IT a popredné firmy z tohto dynamického odvetvia. Konferencia nConnect nadväzuje na dlhoročnú tradíciu formátu "IT v praxi" Fakulty prírodných vied a informatiky UKF v Nitre. Táto iniciatíva je mostom medzi novou generáciou talentov a skúsenými profesionálmi, ktorý poskytuje fórum pre vzájomnú výmenu myšlienok a inšpirácií. Naše poslanie bolo jasné: vyplniť medzeru v regionálnej komunikácii a spolupráci v IT a nConnect je hrdým výsledkom tejto vízie.
            </div>
            <div class="qnas">
                <div class="qna">
                    <div class="title">Kto sme ?</div> 
                    <div class="answer">Sme skupina nadšencov pre IT z akademického a súkromného sektora.</div>
                </div>
                <div class="qna">
                    <div class="title">Čo chceme dosiahnuť ?</div> 
                    <div class="answer">Vytvoriť udalosť, ktorá bude na pravidelnej báze spájať IT komunitu v Nitre.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';

.about {
    $gap: 2em;
    display: flex;
    gap: $gap;

    @include media.phone {
        flex-direction: column;
    }

    > .left, > .right {
        width: calc((100% - $gap) / 2);

        @include media.phone {
            width: 100%;
        }
    }

    > .left {
        > img {
            width: 100%;
        }
    }

    > .right {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 1em;

        > .title {
            text-transform: uppercase;
            font-weight: 900;
            font-size: 1.4em;
        }

        > .about {
            line-height: 2em;
        }

        > .qnas {
            $gap: 1em;
            display: flex;
            flex-wrap: wrap;
            gap: $gap;

            > .qna {
                @include mixins.card-shadow;
                width: calc((100% - $gap) / 2);
                padding: 1em;
                background-color: var(--clr-bg);
                display: flex;
                flex-direction: column;
                gap: 0.5em;

                > .title {
                    text-transform: uppercase;
                    font-weight: 900;
                    font-size: 1.1em;
                }

            }
        }
    }
}
</style>