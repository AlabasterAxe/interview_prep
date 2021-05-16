import { Component } from '@angular/core';
import { zeroPad } from 'src/utils/zero-pad';
import { Data, DataType } from 'src/model/model';

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

  evaluateStep() {}
}
