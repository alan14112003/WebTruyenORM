function createKeyEnum(name) {
  return {
    ID: name + 'id',
    REFRESH: name + 'refresh',
  }
}

const AuthKeyEnum = createKeyEnum('auth:')

export default AuthKeyEnum
