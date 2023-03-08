import { Field, InputType } from 'type-graphql';
import { AddressInput } from '@/domain/user/inputs/address.input';

@InputType()
export class UserInput {
  @Field()
    name: string;

  @Field()
    age: number;

  @Field()
    address: AddressInput;
}
