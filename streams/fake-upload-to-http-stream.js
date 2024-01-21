import { Readable } from 'node:stream'

class OnToHundredStream extends Readable {

  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null) //push fornece informações para quem está consumindo ela
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 100)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OnToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data);
})