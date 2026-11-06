/* Browser-only access guidance; static files remain publicly accessible. */
;(async () => {
  const message = document.getElementById('access-message')
  const retry = document.getElementById('access-retry')
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error('IP lookup failed')
    const data = await response.json()
    if (data.ip !== '210.94.41.89') {
      message.textContent = '사내에서 접속해 주세요.'
      retry.hidden = false
      return
    }
    const slides = await fetch('./lecture.html', {
      cache: 'no-store', signal: AbortSignal.timeout(15000),
    })
    if (!slides.ok) throw new Error('Slide loading failed')
    const html = await slides.text()
    document.open()
    document.write(html)
    document.close()
  }
  catch {
    message.textContent = '접속을 확인할 수 없습니다. 사내에서 접속해 주세요.'
    retry.hidden = false
  }
})()
