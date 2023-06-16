export function convertToYYYYMMDD_HHMMSS(rawDate: string) {
    if (rawDate === '' || rawDate == undefined) {
        return 'empty';
    }
    const dateList = rawDate.split('T');
    const timeList = dateList[1].split('.')[0].split(':');
    const hhMM = (Number(timeList[0]) + 9) + ":" + timeList[1]; 
    return dateList[0] + " " + hhMM;
}