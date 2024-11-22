function convertMoneyToInteger(value) {
    const intMoney = (value * 100).toFixed(2)

    return intMoney;
}

export {
    convertMoneyToInteger,

}