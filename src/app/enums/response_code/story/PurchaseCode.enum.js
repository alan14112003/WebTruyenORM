function createCodeEnum(prefix) {
  return {
    balanceNotEnough: prefix + 'balance_not_enough',
  }
}

const PurchaseCodeEnum = createCodeEnum('purchase.')

export default PurchaseCodeEnum
