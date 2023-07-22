export function getUTCTime(dateTimeString: string): Date {
    const dateTime = new Date(dateTimeString);
    const dateTimeNumber = dateTime.getTime();
    const dateTimeOffset = dateTime.getTimezoneOffset() * 60000;
    const dateTimeUTC = new Date();
    dateTimeUTC.setTime(dateTimeNumber - dateTimeOffset);

    return dateTimeUTC;
}
