"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var midi = __importStar(require("midi"));
var input = new midi.Input();
var portCount = input.getPortCount();
console.log('midiInput port name:');
var inputPortMap = new Map();
for (var i = 0; i < portCount; i++) {
    inputPortMap.set(input.getPortName(i), i);
    console.log(input.getPortName(i));
}
console.log('nanoPAD2 PAD port: ' + inputPortMap.get('nanoPAD2 PAD'));
input.on('message', function (deltaTime, message) {
    var tm = fromMessage(message);
    // console.log(`m: ${message} d: ${deltaTime}`)
    console.log('ch: ' + tm.ch + ', noteNum: ' + tm.noteNumber + ', vel: ' + tm.vel + ', d: ' + deltaTime);
});
// input.openPort(inputPortMap.get('nanoPAD2 PAD')!)
input.openPort(inputPortMap.get('nanoPAD2 PAD'));
setTimeout(function () { return input.closePort(); }, 10000);
function fromMessage(message) {
    return { ch: message[0], noteNumber: message[1], vel: message[2] };
}
exports.fromMessage = fromMessage;
