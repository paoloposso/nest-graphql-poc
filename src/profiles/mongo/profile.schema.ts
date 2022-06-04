import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = ProfileDbSchema & Document;

@Schema()
export class ProfileDbSchema {
    constructor(init?: Partial<ProfileDbSchema>) {
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

export const ProfileSchema = SchemaFactory.createForClass(ProfileDbSchema);