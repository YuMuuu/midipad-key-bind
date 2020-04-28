//https://github.com/justinlatimer/node-midi/blob/master/midi.js

declare module 'midi' {
  import * as stream from 'stream'

  export function createReadStream(input: Input | null): stream.Stream;
  export function createWriteStream(output: Output | null): stream.Stream;
  export class Input {
    getPortCount(): number;
    getPortName(port: number): string;
    //todo: Promiseeを返却するように変換する
    on(message: Message, callback: (deltaTime: number, message: Message) => void): void;
    openPort(port: number): void;
    ignoreTypes(Sysex: boolean, Timing: boolean, ActiveSensing: boolean): void;
    closePort(): void;
  }
  export class Output {
    getPortCount(): number;
    getPortName(port: number): string;
    openPort(port: number): void;
    sendMessage(message: Message): void;
    closePort(): void;
  }
  //todo: message type is 3length array
  type Message = Array<number>;
}
