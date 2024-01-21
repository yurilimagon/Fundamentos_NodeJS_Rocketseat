import { Readable, Writable, Transform } from 'node:stream'

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

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable { //Uma stream de escrita não retorna nada, ela somente processa o dado
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

new OnToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())