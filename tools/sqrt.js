function sqrt(number) {
    if (number < 0) {
        throw new Error("Cannot calculate square root of a negative number!");
    }
    return Math.sqrt(number);
}
module.exports = sqrt;