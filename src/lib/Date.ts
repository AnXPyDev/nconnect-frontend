import { formatISO, parseISO, format } from 'date-fns';

//const mysql_datetime_fmt = "y-M-d H:m:s";

const pretty_fmt = "d. M. y HH:mm:ss";

export function exportDateTime(dt: Date) {
    return formatISO(dt);
}

export function prettyDateTime(dt: string) {
    const f = format(dt, pretty_fmt);
    return f;
}

export function parseDateTime(dts: string): Date {
    return parseISO(dts);
}

export function isDateValid(dts: string): boolean {
    const d = parseISO(dts);
    if (isNaN(d.getTime())) {
        return false;
    }
    return true;
}