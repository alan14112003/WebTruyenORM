import UploadUtil from '@/app/utils/Upload.util'

const UploadController = {
  uploadSingleFile: async (req, res, next) => {
    try {
      const file = req.file
      const { path } = await req.body

      if (!file) {
        return res.status(400).json('Please upload a file')
      }

      if (!path) {
        return res.status(422).json('path is required')
      }

      const fileResponse = await UploadUtil.uploadSingleFile(file.path, path)
      return res.status(200).json(fileResponse)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  deleteSingleFile: async (req, res, next) => {
    try {
      const { path } = await req.body

      if (!path) {
        return res.status(422).json('path is required')
      }

      const deleted = await UploadUtil.deleteSingleFile(path)
      return res.status(200).json(deleted)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default UploadController
