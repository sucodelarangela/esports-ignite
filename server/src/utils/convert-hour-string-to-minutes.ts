// '18:00' -> 1080
export function convertHourStringToMinutes(hourString: string) {
    // '18:00' -> ['18', '00'] -> [18, 00]
    // hours = 18; minutes = 00
    const [hours, minutes] = hourString.split(':').map(Number);

    // 18 * 60 + 00
    const minutesAmount = hours * 60 + minutes;

    return minutesAmount;
}