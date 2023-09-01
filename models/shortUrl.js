// 引入套件
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 建立資料表 schema(欄位)，並設定格式
const shortUrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  }
})

// 匯出資料表
module.exports = mongoose.model('ShortUrl', shortUrlSchema)