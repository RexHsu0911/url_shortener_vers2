module.exports = function generateShortId(length) {
  let randomString = ''
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < length; i++) {
    // charAt 回傳字串特定位置(計算方式)的字元
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return randomString
}