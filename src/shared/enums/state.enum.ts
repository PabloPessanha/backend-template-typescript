import { registerEnumType } from 'type-graphql';

export enum States {
  RJ = 'RJ',
  SP = 'SP'
}

registerEnumType(States, { name: 'States' });
