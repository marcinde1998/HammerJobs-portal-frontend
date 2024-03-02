export default function formatDate(date: string | Date): string {
    if (typeof date === 'string') {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            console.error("Nieprawidłowy format daty:", date);
            return '';
        }
        return formatDate(parsedDate);
    } else if (date instanceof Date) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    } else {
        console.error("Nieprawidłowy typ danych dla daty:", date);
        return '';
    }
}
