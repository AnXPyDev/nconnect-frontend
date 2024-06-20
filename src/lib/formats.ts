import { format, parseISO } from "date-fns";
import { sk } from "date-fns/locale";

export function presentationDateFormat(date: string) {
    return format(parseISO(date), "d LLLL yyyy", { locale: sk });
}