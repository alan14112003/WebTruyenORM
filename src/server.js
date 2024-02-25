import express from 'express'
import { configDotenv } from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Router from './routes'
import initSocket from './events'
import initRelationship from './app/models'
import initCron from './cron'

// Cấu hình dotenv
configDotenv()

// tạo app là đường dẫn gốc trong thư mục
const app = express()

// Cấu hình thư mục public cho static
app.use(express.static(path.join(__dirname, 'public')))

// sử dụng cors để kiểm tra origin
app.use(cors())

app.use(cookieParser())

// sử dụng body-parser để parse body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Cấu hình sử dụng routes để định tuyến các tuyến đường cho app
app.use('/', Router)

// middleware bắt lỗi
app.use((err, req, res, next) => {
  const status = err.status || 500

  return res.status(status).json(err)
})

// gắn nghe cho app và gán vào server
const server = app.listen(process.env.PORT || 80, () => {
  console.log(`Server đang chạy ở cổng ${process.env.PORT}`)
})

// mô tả các mối quan hệ
initRelationship()

// khởi động socket
initSocket(server)

// khởi động cronjob
initCron()
