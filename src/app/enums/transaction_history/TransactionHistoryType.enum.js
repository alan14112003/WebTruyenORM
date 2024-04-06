const TransactionHistoryTypeEnum = {
  IN: 10,
  OUT: 200,

  allName() {
    return {
      [this.IN]: 'Nạp tiền',
      [this.OUT]: 'Rút tiền',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default TransactionHistoryTypeEnum
