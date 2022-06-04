import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateProfileInput  {
    @Field((type) => String, {nullable: false})
    email: string;
    @Field((type) => String, {nullable: false})
    name: string;
}