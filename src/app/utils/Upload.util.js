import CloudinaryConfig from '@/config/Cloudinary.config'

const UploadUtil = {
  uploadSingleFile: async (file, path) => {
    const uploadResponse = await CloudinaryConfig.uploader.upload(file, {
      folder: process.env.CLOUDINARY_FOLDER + path,
    })

    return {
      url: uploadResponse.url,
      public_id: uploadResponse.public_id,
    }
  },

  deleteSingleFile: async (public_id) => {
    const deleteResponse = await CloudinaryConfig.uploader.destroy(public_id)

    return deleteResponse
  },
}

export default UploadUtil
