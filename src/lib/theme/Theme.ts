import { useState } from "@/stores/state";

export enum Theme {
    Light, Dark
};


export function setTheme(theme: Theme) {
    const root = document.documentElement;

    for (const clss in root.classList) {
        if (clss.startsWith('theme-')) {
            root.classList.remove(clss);
        }
    }

    root.classList.add(`theme-${Theme[theme].toLowerCase()}`);

    const state = useState();
    state.theme = theme;

}