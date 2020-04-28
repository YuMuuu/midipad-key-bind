import * as midi from 'midi'

const input = new midi.Input()

const portCount = input.getPortCount()

console.log('midiInput port name:')
for (let i = 0; i < portCount; i++) {
  console.log(input.getPortName(i))
}
