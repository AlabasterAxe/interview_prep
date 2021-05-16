export enum DataType {
  instruction = 'instruction',
  number = 'number',
  string = 'string',
  no_data = 'no_data',
}

export enum InstructionType {
  add = 'add',
  move = 'move',
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

  // if reference type is memory or register, value will be a number
  // literal can be a data
  value: number | Data;
}

export interface MovePayload {
  src: Reference;

  // the only allowable reference types for destination are memory and register
  dst: Reference;
}

export interface InstructionPayload {
  type: InstructionType;
  payload: AddPayload | MovePayload;
}

export interface Data {
  type: DataType;
  payload?: InstructionPayload | number | string;
}
