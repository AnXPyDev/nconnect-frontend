import { format, parseISO } from "date-fns";
import type { Timeslot } from "../remote/Models";
import { sk } from "date-fns/locale";

interface TimeslotWrapper {
    start_at: Date
    timeslot: Timeslot
}

export const date_fmt = "EEEE, d. M. y"

export function sortTimeslots(unsorted: Timeslot[]): { dates: string[], timeslots: Record<string, Timeslot[]> } {
    const sorted = unsorted
        .map((timeslot) => ({ start_at: parseISO(timeslot.start_at), timeslot }) as TimeslotWrapper)
        .sort((a, b) => a.start_at.getTime() - b.start_at.getTime());
    
    const dates: string[] = [];
    const byDate: Record<string, Timeslot[]> = {};
    {
        let lastDate = "MILUJEM TYPESKRIT + LARAWELL <3";

        let timeslots: Timeslot[] = [];
        for (const w of sorted) {
            const date = format(w.start_at, "EEEE, d. M. y", { locale: sk });
            if (date !== lastDate) {
                dates.push(date)
                lastDate = date;
                timeslots = [];
                byDate[date] = timeslots;
            }
            timeslots.push(w.timeslot);
        }
    }

    return { dates, timeslots: byDate };
}