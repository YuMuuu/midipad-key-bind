import * as midi from 'midi'
import * as child_process from 'child_process'

const input = new midi.Input()
const portCount = input.getPortCount()

const exec = child_process.execSync

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

    switch(tm.note) {
      case 36:
        exec('open -a Slack')
        break
      case 37:
        exec('open -a ChatWork')
        break
      case 38:
        exec('open -a "IntelliJ\ IDEA"')
        break            
      case 39:
        exec('open -a "Android\ Studio"')
        break 
      case 40:
        exec('')
        break 
      case 41:
        exec('')
        break      
      case 42:
        exec('')
        break 
      case 43:
        exec('')
        break 
      case 44:
        exec('')
        break 
      case 45:
        exec('')
        break 
      case 46:
        exec('')
        break 
      case 47:
        exec('')
        break 
      case 48:
        exec('')
        break 
      case 49:
        exec('')
        break 
      case 50:
        exec('')
        break 
      case 51:
        exec('')
        break 
      default:
        break  
    }
  }
})

input.openPort(inputPortMap.get('nanoPAD2 PAD')!)
console.log('-----start-----')



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

// nanopad noten: 36 ~ 51
//borad map
// | - | - | - | - | - | - | - | - |
// |37 |39 |41 |43 |45 |47 |49 |51 |
// | - | - | - | - | - | - | - | - |
// |36 |38 |40 |42 |44 |46 |58 |50 |
// | - | - | - | - | - | - | - | - |
function isNanoPad2Scale(note: number): boolean {
  return (36 <= note && note <= 51)
}
