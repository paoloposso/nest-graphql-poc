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
        let result: Profile;
        let document = await this.profileModel.findById(id).exec();
        Object.assign(result, document);
        return result;
    }

    public async create(input: CreateProfileInput): Promise<string> {
        const model = new this.profileModel(input);

        const result = model.save();
        return (await result).id;
    }
}