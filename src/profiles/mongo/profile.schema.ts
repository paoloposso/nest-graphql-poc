import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = ProfileDb & Document;

@Schema()
export class ProfileDb {
    constructor(init?: Partial<ProfileDb>) {
        Object.assign(this, init);
    }

    @Prop({required: true})
    id: string;

    @Prop({required: true})
    email: string;

    @Prop({ nullable: true })
    name: string;

    @Prop({ nullable: true })
    registered: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileDb);