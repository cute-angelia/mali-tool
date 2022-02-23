import b64 from "base-64"

export function urlToDataUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
        credentials: 'include',
      })
      .then(response => response.blob())
      .then(blob => new Promise((resolve2, reject2) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve2(reader.result)
        reader.onerror = reject2
        reader.readAsDataURL(blob)
      })).then((dataUrl) => {
        resolve(dataUrl)
      }).catch(e => {
        reject(e)
      })
  })
}


// dataUrl 转化
// .then((type, blob) => { var url = URL.createObjectURL(blob) }
export function dataURItoBlob(dataURI) {
  return new Promise((resolve) => {
    var byteString = b64.decode(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    resolve(mimeString, bb)
  })
}

// 图片具大化
export function largeImg(imgUrl) {
  if (imgUrl) {
    // 微博
    if (imgUrl.indexOf("sinaimg.cn") > 0) {
      // https://wx3.sinaimg.cn/mw690/002C8iduly1gvbmia82psj622o340u1102.jpg
      var b = new URL(imgUrl)
      var temps = b.pathname.split('/')
      temps[1] = 'large'
      imgUrl = b.origin + "" + temps.join("/")
    }
    // twitter
    if (imgUrl.indexOf("twimg.com") > 0) {
      if (imgUrl.indexOf("?") > 0) {
        imgUrl = imgUrl.substring(0, imgUrl.indexOf("?"))
      }
      imgUrl = imgUrl + "?format=jpg&name=orig"
    }
  }

  return imgUrl
}