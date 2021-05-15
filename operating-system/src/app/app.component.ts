import { ChangeDetectorRef, Component } from '@angular/core';
import { zeroPad } from 'src/utils/zero-pad';

const MEMORY_SIZE = 4;

enum DataType {
  instruction = 'instruction',
  number = 'number',
  string = 'string',
  no_data = 'no_data',
}

enum InstructionType {
  add,
  move,
}

interface AddPayload {
  register1: number;
  register2: number;
  destinationAddr: number;
}

enum ReferenceType {
  memory,
  register,
  literal,
}

interface Reference {
  type: ReferenceType;
  value: number;
}

interface MovePayload {
  src: Reference;
  dst: Reference;
}

interface InstructionPayload {
  type: InstructionType;
  payload: AddPayload | MovePayload;
}

interface Data {
  type: DataType;
  payload: InstructionPayload | number | string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly cdr: ChangeDetectorRef) {}

  memory: Data[] = Array(MEMORY_SIZE).fill({
    type: DataType.no_data,
  });

  programCounter = 0;

  zeroPad = zeroPad;

  store(addr: number, event: Event) {
    this.memory[addr] = JSON.parse((event.target as HTMLInputElement).value);
  }

  getValue(addr: number): Data {
    return this.memory[addr];
  }

  trackByFn(index: number) {
    return index;
  }
}
