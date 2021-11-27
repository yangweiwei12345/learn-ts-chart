import { timeParse, utcParse } from 'd3-time-format'

export const timePrecisions = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'month',
    'year'
];

export const precisionCutOffs = [
    date => date.setMilliseconds(0),
    date => date.setSeconds(0),
    date => date.setMinutes(0),
    date => date.setHours(0),
    date => date.setDate(1),
    date => date.setMonth(0)
]

export const precisionCutOffsByType = {
    millisecond: [],
    second: precisionCutOffs.slice(0, 1),
    minute: precisionCutOffs.slice(0, 2),
    hour: precisionCutOffs.slice(0, 3),
    day: precisionCutOffs.slice(0, 4),
    month: precisionCutOffs.slice(0, 5),
    year: precisionCutOffs.slice(0, 6)
}

export const createPrecisionMethod = (precision) => (date) => {
    precisionCutOffsByType[precision].forEach(cutOff => {
        cutOff(date);
    });

    return date;
}

export const createDateNormalizer = ({
    format = 'native',
    precision = 'millisecond',
    useUTC = true
}) => {
    const precisionFn = createPrecisionMethod(precision);

    return (value) => {
        if(value === undefined) {
            return value;
        }

        if(format === 'native' || value instanceof Date) {
            return precisionFn(value);
        }

        const parseTime = useUTC ? utcParse(format) : timeParse(format);
        return precisionFn(parseTime(value));
    }
}