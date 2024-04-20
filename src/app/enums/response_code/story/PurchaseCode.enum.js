function createCodeEnum(prefix) {
  return {
    balanceNotEnough: prefix + 'balance_not_enough',
    success: prefix + 'success',
  }
}

const PurchaseCodeEnum = createCodeEnum('purchase.')

export default PurchaseCodeEnum
