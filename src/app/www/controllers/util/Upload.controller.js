import UploadUtil from '@/app/utils/Upload.util'

const UploadController = {
  uploadSingleImage: async (req, res, next) => {
    try {
      const image = req.file
      const { path } = await req.body

      if (!image) {
        return res.status(400).json('Please upload a image')
      }

      if (!path) {
        return res.status(422).json('path is required')
      }

      const avatar = await UploadUtil.uploadSingleFile(image.path, path)
      return res.status(200).json(avatar)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default UploadController
