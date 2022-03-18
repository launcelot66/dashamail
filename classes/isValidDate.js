module.exports = (dateString) => {
    // First check for the pattern
    const reg = /^(\d){4}-(\d){2}-(\d){2}\s(\d){2}:(\d){2}:(\d){2}$/;
    if(!reg.test(dateString)) return false;

    // Parse the date parts to integers
    const parts = reg.exec(dateString);
    const year = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10);
    const day = parseInt(parts[3], 10);
    const hours = parseInt(parts[4], 10);
    const minutes = parseInt(parts[5], 10);
    const seconds = parseInt(parts[6], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12 || hours > 23 || minutes > 59 || seconds > 59)
        return false;

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};
