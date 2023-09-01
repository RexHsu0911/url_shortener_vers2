const express = require('express')
const { engine } = require('express-handlebars')

const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
const shortId = require('./utils/shortId')

const app = express()
// 在主機沒有接口的環境參數時，則使用 3000 作為伺服器接口
const port = 3000

// 與資料庫(mongodb)連線
// MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
// 將 將 localhost 改成 127.0.0.1
mongoose.connect('mongodb://localhost/url-shortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// .then((res) => console.log('mongoose connected!'))
// .catch((err) => console.log('mongoose error!'))


app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
// 使用 qs 進行解析，若為 false，則採用 querystring 進行解析(預設為 false)
// 取得瀏覽器送出 POST 行為時的的表單資料(req.body的資料)，在路由端收到資料後可以直接轉化成 JS 的物件型態，再將其轉存進資料庫
app.use(express.urlencoded({ extended: true }))
// 讓 req.json 讀的到資料
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.post("/", (req, res) => {
  // if (!req.body.shorten) return res.redirect("/")
  // const shortenUrl = shortId(5)
})

// 完成創建 shortUrl 時，即傳入 inputUrl 至表單 fullURL 
app.post('/shortUrls', async (req, res) => {
  await shortUrl.create({ url: req.body.inputUrl })

  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})