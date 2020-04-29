import * as midi from 'midi'

const input = new midi.Input()
const portCount = input.getPortCount()

console.log('-----init-----')
console.log('midiInput port name:')

const inputPortMap = new Map<string, number>()
for (let i = 0; i < portCount; i++) {
  inputPortMap.set(input.getPortName(i), i)
  console.log(input.getPortName(i))
}

console.log('nanoPAD2 PAD port: ' + inputPortMap.get('nanoPAD2 PAD'))


input.on('message', (deltaTime, message) => {
  const tm = fromMessage(message)

  if (isNoteOn(tm.ch)) {
    // console.log('ch: ' + tm.ch + ', note: ' + tm.note + ', vel: ' + tm.vel + ', d: ' + deltaTime)
    console.log('note: '+ tm.note)
  }
})

input.openPort(inputPortMap.get('nanoPAD2 PAD')!)
console.log('-----start-----')

setTimeout(() => {
  input.closePort()
  console.log('-----close-----')
}, 10000)



//--------------------
//utils

type TypedMessage = { ch: number, note: number, vel: number }
export function fromMessage(message: midi.Message): TypedMessage {
  return { ch: message[0], note: message[1], vel: message[2] }
}

function isNoteOn(ch: number): boolean {
  //9n hex, n = 0 ~ 15
  return  (144 <= ch && ch <= 159)
}

// nanopad notenumber: 36 ~ 51
//borad map
// | - | - | - | - | - | - | - | - |
// |37 |39 |41 |43 |45 |47 |49 |51 |
// | - | - | - | - | - | - | - | - |
// |36 |38 |40 |42 |44 |46 |58 |50 |
// | - | - | - | - | - | - | - | - |
function isNanoPad2Scale(note: number): boolean {
  return (36 <= note && note <= 51)
}
