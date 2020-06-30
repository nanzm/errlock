export function post (url, data) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', url, true)
  xhr.setRequestHeader('content-type', 'application/json;charset=utf-8')
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.withCredentials = true
  xhr.timeout = 20000

  xhr.onload = function () {
    const result = window.JSON.parse(xhr.responseText)
    if (result.status === 1) {
    }
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const result = window.JSON.parse(xhr.responseText)
        if (result.status === 1) {
        }
      } else {
      }
    }
  }

  xhr.send(window.JSON.stringify(data))
}
