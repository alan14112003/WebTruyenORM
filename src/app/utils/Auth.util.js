import CloudinaryConfig from '@/config/Cloudinary.config'
import JwtConfig from '@/config/Jwt.config'
import MailConfig from '@/config/Mail.config'

const AuthUtil = {
  getAuthResult: (auth) => {
    return {
      id: auth.id,
      firstName: auth.firstName,
      lastName: auth.lastName,
      fullName: auth.fullName,
      email: auth.email,
      avatar: auth.avatar,
      gender: auth.gender,
      roleCode: auth.roleCode,
    }
  },

  checkAllowed: (auth) => {
    if (!auth.status) {
      return {
        status: false,
        message: 'account is not activated',
      }
    }

    if (auth.deletedAt) {
      return {
        status: false,
        message: 'account is blocked',
      }
    }

    return {
      status: true,
      message: 'pass',
      data: auth,
    }
  },

  generateToken: (auth) => {
    return {
      accessToken: JwtConfig.createToken(auth, '1y'),
      refreshToken: JwtConfig.createToken(auth, '30d'),
    }
  },

  sendActiveMail: (auth, token) => {
    const html = `
      <div class="container" style="background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            margin: 50px auto;
            max-width: 500px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
        <h1 style="
                color: #333;
                margin-top: 0;">Kích hoạt tài khoản của bạn</h1>
                <p>Chào ${auth.fullName}</p>
        <p>Kích hoạt tài khoản nếu đó là bạn(có hiệu lực trong vòng 1h):</p>

        <style>
          a:hover {
            background-color: #166fe5;
          }
        </style>
        <a style="background-color: #1877f2;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none"
          href="${process.env.APP_URL}:${process.env.PORT}/v1/auth/active-email?token=${token}"
        >
          Kích hoạt tài khoản
        </a>
      </div>
    `
    MailConfig.sendMail({
      mailTo: auth.email,
      subject: 'Kích hoạt tài khoản',
      html: html,
    })
  },

  sendResetPasswordMail: (auth, code) => {
    const html = `
      <div class="container" style="background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            margin: 50px auto;
            max-width: 500px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
        <h1 style="
                color: #333;
                margin-top: 0;">Lấy lại mật khẩu</h1>
        <p>Chào ${auth.fullName}</p>
        <p>Mã code để lấy lại mật khẩu là: </p>
        <p style="font-size: 11px;
          font-family: LucidaGrande,tahoma,verdana,arial,sans-serif;
          padding: 14px 32px 14px 32px;
          background-color: #f2f2f2;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          text-align: center;
          border-radius: 7px;
          display: block;
          border: 1px solid #1877f2;
          background: #e7f3ff;">
          <span style="font-size:17px;font-family:Roboto;font-weight:700;margin-left:0px;margin-right:0px">
            ${code}
          </span>
        </p>
      </div>
    `
    MailConfig.sendMail({
      mailTo: auth.email,
      subject: 'Lấy lại mật khẩu',
      html: html,
    })
  },

  uploadAvatar: async (avatar) => {
    const uploadResponse = await CloudinaryConfig.uploader.upload(avatar, {
      folder: process.env.CLOUDINARY_FOLDER + '/auth',
    })

    return JSON.stringify({
      url: uploadResponse.url,
      public_id: uploadResponse.public_id,
    })
  },
}

export default AuthUtil
