import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
    constructor(init?: Partial<Profile>) {
        Object.assign(this, init);
    }

    @Prop({ type: Types.ObjectId })
    id: string;

    @Prop({required: true})
    email: string;

    @Prop({ nullable: true })
    name: string;

    @Prop({ nullable: true })
    registered: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);