const UserUtil = {
  getPublicInfoAttribute: (hasEmail = false) => {
    const attributes = []
    if (hasEmail) {
      attributes.push('email')
    }

    return ['id', 'firstName', 'lastName', 'fullName', 'avatar', ...attributes]
  },
}

export default UserUtil
