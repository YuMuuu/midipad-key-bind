import * as midi from 'midi'

const input = new midi.Input()

const portCount = input.getPortCount()

console.log('midiInput port name:')

const inputPortMap = new Map<string, number>()

for (let i = 0; i < portCount; i++) {
  inputPortMap.set(input.getPortName(i), i)
  console.log(input.getPortName(i))
}

console.log('nanoPAD2 PAD port: ' + inputPortMap.get('nanoPAD2 PAD'))

input.on('message', (deltaTime, message) => {
  const tm = fromMessage(message)
  // console.log(`m: ${message} d: ${deltaTime}`)
  console.log('ch: ' +tm.ch +', noteNum: ' + tm.noteNumber + ', vel: ' + tm.vel + ', d: ' + deltaTime)
})

// input.openPort(inputPortMap.get('nanoPAD2 PAD')!)
input.openPort(inputPortMap.get('nanoPAD2 PAD')!)

setTimeout(() => input.closePort(), 10000)


//--------------------

type TypedMessage = { ch: number, noteNumber: number, vel: number }
export function fromMessage(message: midi.Message): TypedMessage {
  return { ch: message[0], noteNumber: message[1], vel: message[2] }
}
