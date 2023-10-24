const express = require('express')
const router = express.Router()
const Url = require('../models/Url')
const generateShortId = require('../utils/generate-shortId')
const BASE_URL = 'localhost:3000/'

// shortUrl 清單
router.get('/shortUrls', (req, res) => {
  // 將 Model 物件轉成 js 陣列
  Url.find().lean()
    .then(data => {
      res.render('index', { data })
    })
})

// 新增 shortUrl
router.post('/shortUrls', (req, res) => {
  const { fullUrl } = req.body
  const shortenUrl = generateShortId(5)
  if (!fullUrl) {
    const err = new Error('URL is required!')
    err.status = 400
    throw err
  }

  return Promise.all([
    Url.find().lean(),
    Url.findOne({ fullUrl }).lean()
  ])
    .then(([data, createData]) => {
      if (!createData) {
        Url.create({ fullUrl, shortUrl: shortenUrl })
      }
      res.render('index', {
        data,
        createData: BASE_URL + createData.shortUrl
      })
    })
    .catch(error => console.error(error))
})

// shortUrl 連結
router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params

  Url.findOne({ shortUrl })
    .then(data => {
      if (!data) {
        const err = new Error("Can't found this URL!")
        err.status = 404
        throw err
      }

      data.clicks++
      // 的值保存到資料庫中
      data.save()

      res.redirect(data.fullUrl)
    })
    .catch(error => console.error(error))
})

module.exports = router
