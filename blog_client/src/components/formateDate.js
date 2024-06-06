export const formateDate = (date) => {
    const formate = new Date(date);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    let presentDate = formate.getDate().toString();
    if (presentDate.length < 2) {
        presentDate = "0" + presentDate;
    }

    const finalFormat = `${months[formate.getMonth()]} ${presentDate}, ${formate.getFullYear()}`;
    // console.log(finalFormat)
    return finalFormat;
}
