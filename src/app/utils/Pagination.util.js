const PaginationUtil = {
  /**
   * @param { import("sequelize").FindAndCountOptions } options
   */
  paginate: async (model, page, limit, options = {}) => {
    limit = limit ? +limit : 10
    page = page ? +page : 1

    let offset = 0 + (page - 1) * limit
    const { count: total, rows: data } = await model.findAndCountAll({
      offset: offset,
      limit: limit,
      ...options,
    })

    return {
      total: total,
      data: data,
      curPage: page,
      perPage: limit,
    }
  },
}

export default PaginationUtil
