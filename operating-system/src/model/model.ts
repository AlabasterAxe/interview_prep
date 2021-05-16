export enum DataType {
  instruction = 'instruction',
  number = 'number',
  string = 'string',
  no_data = 'no_data',
}

export enum InstructionType {
  add,
  move,
}

export interface AddPayload {
  register1: number;
  register2: number;
  destinationAddr: number;
}

export enum ReferenceType {
  memory = 'memory',
  register = 'register',
  literal = 'literal',
}

export interface Reference {
  type: ReferenceType;
  value: number;
}

export interface MovePayload {
  src: Reference;
  dst: Reference;
}

export interface InstructionPayload {
  type: InstructionType;
  payload: AddPayload | MovePayload;
}

export interface Data {
  type: DataType;
  payload: InstructionPayload | number | string;
}
