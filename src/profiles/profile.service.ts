import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileDocument, ProfileSchema, ProfileDbSchema } from "./mongo/profile.schema";

export class ProfileService {

    constructor(
        @InjectModel(ProfileDbSchema.name) 
        private profileModel: Model<ProfileDocument>
    ) {}

    public async getProfileById(id: string): Promise<Profile> {
        return new Profile({id, email: 'pvictorsys@gmail.com' });
    }

    public async create(input: CreateProfileInput): Promise<string> {
        const model = new this.profileModel(input);
        let errors: string[] = [];

        if (!input.email || input.email.length === 0) {
            errors.push('Email is required');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(';'));
        }

        const result = model.save();
        return (await result).id;
    }
}