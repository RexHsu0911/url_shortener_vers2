const shortenUrl = document.getElementById('shortUrl')
const copy = document.getElementById('copy')

copy.addEventListener('click', () => {
  // 複製到剪貼板中
  navigator.clipboard.writeText(shortenUrl.innerText)
  copy.innerHTML = 'copied!'

  // 設置計時器
  setTimeout(() => {
    copy.innerHTML = 'copy'
  }, 1000)
})
