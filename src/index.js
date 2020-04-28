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
for (var i = 0; i < portCount; i++) {
    console.log(input.getPortName(i));
}
