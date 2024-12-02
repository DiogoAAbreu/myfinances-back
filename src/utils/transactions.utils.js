function sumTransactionsValues(transactions) {
    const balance = transactions.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
    }, 0);

    return balance;
}

export {
    sumTransactionsValues,

}