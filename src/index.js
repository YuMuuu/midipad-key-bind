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
var child_process = __importStar(require("child_process"));
var input = new midi.Input();
var portCount = input.getPortCount();
var exec = child_process.execSync;
console.log('-----init-----');
console.log('midiInput port name:');
var inputPortMap = new Map();
for (var i = 0; i < portCount; i++) {
    inputPortMap.set(input.getPortName(i), i);
    console.log(input.getPortName(i));
}
console.log('nanoPAD2 PAD port: ' + inputPortMap.get('nanoPAD2 PAD'));
input.on('message', function (deltaTime, message) {
    var tm = fromMessage(message);
    if (isNoteOn(tm.ch)) {
        // console.log('ch: ' + tm.ch + ', note: ' + tm.note + ', vel: ' + tm.vel + ', d: ' + deltaTime)
        console.log('note: ' + tm.note);
        switch (tm.note) {
            case 36:
                exec('open -a Slack');
                break;
            case 37:
                exec('open -a ChatWork');
                break;
            case 38:
                exec('open -a IntelliJ\ IDEA');
                break;
            default:
                break;
        }
    }
});
input.openPort(inputPortMap.get('nanoPAD2 PAD'));
console.log('-----start-----');
setTimeout(function () {
    input.closePort();
    console.log('-----close-----');
}, 10000);
function fromMessage(message) {
    return { ch: message[0], note: message[1], vel: message[2] };
}
exports.fromMessage = fromMessage;
function isNoteOn(ch) {
    //9n hex, n = 0 ~ 15
    return (144 <= ch && ch <= 159);
}
// nanopad noten: 36 ~ 51
//borad map
// | - | - | - | - | - | - | - | - |
// |37 |39 |41 |43 |45 |47 |49 |51 |
// | - | - | - | - | - | - | - | - |
// |36 |38 |40 |42 |44 |46 |58 |50 |
// | - | - | - | - | - | - | - | - |
function isNanoPad2Scale(note) {
    return (36 <= note && note <= 51);
}
