import { Field, ObjectType } from 'type-graphql';
import { AddressSchema } from '@/domain/user/schemas/address.schema';

@ObjectType()
export class UserSchema {
  @Field({ nullable: true })
    id?: string;

  @Field()
    name: string;

  @Field()
    age: number;

  @Field()
    address: AddressSchema;
}
