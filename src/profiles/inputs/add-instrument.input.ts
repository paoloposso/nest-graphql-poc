import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddInstrumentInput  {
    @Field((type) => [String], {nullable: false})
    instruments: string[];
}
