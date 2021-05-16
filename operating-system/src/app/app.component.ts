import { Component } from '@angular/core';
import { zeroPad } from 'src/utils/zero-pad';
import {
  Data,
  DataType,
  InstructionPayload,
  InstructionType,
  MovePayload,
  ReferenceType,
} from 'src/model/model';

const MEMORY_SIZE = 4;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  memory: Data[] = Array(MEMORY_SIZE).fill({
    type: DataType.no_data,
  });

  constructor() {
    const existingMemory = localStorage.getItem('memory');
    if (existingMemory) {
      this.memory = JSON.parse(existingMemory);
    }
  }

  programCounter = 0;

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
    const data = this.memory[this.programCounter];
    if (data.type !== DataType.instruction) {
      return;
    }

    this.evaluateInstruction(data.payload as InstructionPayload);
  }

  evaluateInstruction(instruction: InstructionPayload) {
    switch (instruction.type) {
      case InstructionType.move:
        this.evaluateMove(instruction.payload as MovePayload);
        break;
    }
  }

  evaluateMove(movePayload: MovePayload) {
    let value: Data = { type: DataType.no_data };
    switch (movePayload.src.type) {
      case ReferenceType.literal:
        value = movePayload.src.value as Data;
        break;
      case ReferenceType.memory:
        value = this.memory[movePayload.src.value as number];
        break;
    }

    switch (movePayload.dst.type) {
      case ReferenceType.literal:
        throw 'Not Allowed';
      case ReferenceType.memory:
        this.memory[movePayload.dst.value as number] = value;
        break;
    }
  }
}
