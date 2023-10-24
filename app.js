const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

// mongoose.connect 連接 MongoDB 數據庫
// 'mongodb://[資料庫帳號]:[資料庫密碼]@[MongoDB位置]:[port]/[資料庫名稱]'
// mongoDB 預設的 port 是 27017，這裡可以省略
// urlShortener 是 database 的名稱，當 app 執行時，mongoose 會自動建立這個 database

// 問題:在 node.js v18中，localhost 使用 ipv6 位址（::1），且預設情況下mongodb localhost 沒有啟用ipv6
// 1.替換掉 localhost 使用 ipv4 本機位址(127.0.0.1)
// 2.使用 family: 4 參數，告訴 Node.js 本地主機使用 ipv4 位址
// 3.使用 ipv6 位址，則只需 mongod 以 --ipv6 參數啟用
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('mongodb connected!'))
  .catch(error => console.error(error, 'mongodb error!'))

const app = express()
// 在主機沒有接口的環境參數時，則使用 3000 作為伺服器接口
const port = process.env.PORT || 3000
const router = require('./routes')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
// 解析前端 POST 回來的資料
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})
