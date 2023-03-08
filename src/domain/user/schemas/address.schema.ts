import { Field, ObjectType } from 'type-graphql';
import { States } from '@/shared/enums/state.enum';

@ObjectType()
export class AddressSchema {
  @Field({ nullable: true })
    id: number;

  @Field(() => States)
    state: States;

  @Field()
    cep: string;

  @Field(() => String, { nullable: true })
    street?: string;
}
