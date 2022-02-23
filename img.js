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