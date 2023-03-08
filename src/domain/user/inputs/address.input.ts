import { Field, InputType } from 'type-graphql';
import { States } from '@/shared/enums/state.enum';

@InputType()
export class AddressInput {
  @Field(() => States)
    state: States;

  @Field()
    cep: string;

  @Field(() => String, { nullable: true })
    street?: string;
}
