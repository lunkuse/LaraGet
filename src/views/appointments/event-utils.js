let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [{
        id: createEventId(),
        title: 'Meeting with the doctor',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Body Check Up',
        start: todayStr + 'T12:00:00'
    },
    {
        title: 'Meeting with the doctor',
        start: '2022-06-02 17:30:00',
        end: '2022-06-03 21:30:00',
        color:'red'
    },
    { title: 'CheckUp', date: '2022-06-08' }, { title: 'General CheckUp', date: '2022-06-16' }
]

export function createEventId() {
    return String(eventGuid++)
}