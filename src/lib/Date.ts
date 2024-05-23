import { format, formatISO, parse, parseISO } from 'date-fns';

//const mysql_datetime_fmt = "y-M-d H:m:s";

const pretty_fmt = "d. M. y HH:mm:ss";

export function exportDateTime(dt: Date) {
    return formatISO(dt);
}

export function prettyDateTime(dt: Date) {
    return format(dt, pretty_fmt);
}

export function parseDateTime(dts: string): Date {
    return parseISO(dts);
}