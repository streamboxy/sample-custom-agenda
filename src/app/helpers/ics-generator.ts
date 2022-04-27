export class IcsGenerator {
    public static DownloadIcs(start: string, end: string, title: string) {
        const ics = this.generateIcs(start, end, title);
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ics));
        element.setAttribute('download', `${title}.ics`);
        element.setAttribute('target', '_blank');
        element.style.display = 'none';
        element.click();
    }

    private static generateIcs(start: string, end: string, title: string) {
        let iCalendar = `BEGIN:VCALENDAR
PRODID:-//Events Calendar//Streamboxy 1.0//DE
VERSION:2.0
`;
        const timeStamp = new Date().toISOString();
        const uuid = `${timeStamp}Z-uid@streamboxy.com`;
        // Don't ever format this string template
        const event = `BEGIN:VEVENT
DTSTAMP:${timeStamp}Z
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
UID:${uuid}
END:VEVENT`;
        iCalendar += `${event}
`;
        iCalendar += `END:VCALENDAR`;
        return iCalendar;
    }
}