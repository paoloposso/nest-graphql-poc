import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {

    constructor(init?: Partial<Profile>) {
        Object.assign(this, init);
    }

    @Field(() => ID)
    id: string;

    @Field({ nullable: false })
    email: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    registered: Date;
}