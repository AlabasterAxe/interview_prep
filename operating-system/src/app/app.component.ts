import { Component } from '@angular/core';
import { zeroPad } from 'src/utils/zero-pad';
import {
  AddPayload,
  Data,
  DataType,
  InstructionPayload,
  InstructionType,
  MovePayload,
  Reference,
  ReferenceType,
} from 'src/model/model';

const MEMORY_SIZE = 64;
const CLOCK_FREQUENCY = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  memory: Data[] = Array(MEMORY_SIZE).fill({
    type: DataType.no_data,
  });
  registers: Data[] = [
    {
      type: DataType.number,
      payload: 0,
    },
    { type: DataType.no_data },
    { type: DataType.no_data },
    { type: DataType.no_data },
  ];
  clockValue = true;
  runProgram = false;

  constructor() {
    const existingMemory = localStorage.getItem('memory');
    if (existingMemory) {
      this.memory = JSON.parse(existingMemory);
    }
    setInterval(() => {
      this.clockValue = !this.clockValue;
      if (this.runProgram) {
        this.evaluateStep();
      }
    }, (1 / CLOCK_FREQUENCY) * 1000);
  }

  zeroPad = zeroPad;

  store(addr: number, event: Event) {
    this.memory[addr] = JSON.parse((event.target as HTMLInputElement).value);
    localStorage.setItem('memory', JSON.stringify(this.memory));
  }

  getValue(addr: number): Data {
    return this.memory[addr];
  }

  trackByFn(index: number) {
    return index;
  }

  evaluateStep() {
    const pc = this.registers[0];
    const data = this.memory[pc.payload as number];

    if (pc?.type !== DataType.number || data.type !== DataType.instruction) {
      this.runProgram = false;
      return;
    }

    this.evaluateInstruction(data.payload as InstructionPayload);
    (pc.payload as number)++;
  }

  evaluateInstruction(instruction: InstructionPayload) {
    switch (instruction.type) {
      case InstructionType.move:
        this.evaluateMove(instruction.payload as MovePayload);
        break;
      case InstructionType.add:
        this.evaluateAdd(instruction.payload as AddPayload);
        break;
      case InstructionType.nop:
        break;
    }
  }

  putValueAtReference(dst: Reference, value: Data) {
    switch (dst.type) {
      case ReferenceType.literal:
        throw 'Not Allowed';
      case ReferenceType.memory:
        this.memory[dst.value as number] = value;
        break;
      case ReferenceType.register:
        this.registers[dst.value as number] = value;
        break;
    }
  }

  evaluateAdd(payload: AddPayload) {
    const value1 = this.registers[payload.register1] as Data;
    const value2 = this.registers[payload.register2] as Data;
    if (value1.type === DataType.number && value2.type === DataType.number) {
      this.putValueAtReference(payload.dst, {
        type: DataType.number,
        payload: (value1.payload as number) + (value2.payload as number),
      });
    }
  }

  evaluateMultiply(payload: AddPayload) {
    const value1 = this.registers[payload.register1] as Data;
    const value2 = this.registers[payload.register2] as Data;
    if (value1.type === DataType.number && value2.type === DataType.number) {
      this.putValueAtReference(payload.dst, {
        type: DataType.number,
        payload: (value1.payload as number) * (value2.payload as number),
      });
    }
  }

  evaluateSubtract(payload: AddPayload) {
    const value1 = this.registers[payload.register1] as Data;
    const value2 = this.registers[payload.register2] as Data;
    if (value1.type === DataType.number && value2.type === DataType.number) {
      this.putValueAtReference(payload.dst, {
        type: DataType.number,
        payload: (value1.payload as number) - (value2.payload as number),
      });
    }
  }

  evaluateDivide(payload: AddPayload) {
    const value1 = this.registers[payload.register1] as Data;
    const value2 = this.registers[payload.register2] as Data;
    if (value1.type === DataType.number && value2.type === DataType.number) {
      this.putValueAtReference(payload.dst, {
        type: DataType.number,
        payload: (value1.payload as number) / (value2.payload as number),
      });
    }
  }

  evaluateMove(payload: MovePayload) {
    let value: Data = { type: DataType.no_data };
    switch (payload.src.type) {
      case ReferenceType.literal:
        value = { ...(payload.src.value as Data) };
        break;
      case ReferenceType.memory:
        value = { ...this.memory[payload.src.value as number] };
        break;
      case ReferenceType.register:
        value = { ...this.registers[payload.src.value as number] };
        break;
    }

    this.putValueAtReference(payload.dst, value);
  }

  reset() {
    this.registers[0] = { type: DataType.number, payload: 0 };
    this.runProgram = false;
  }

  run() {
    this.runProgram = true;
  }
}
