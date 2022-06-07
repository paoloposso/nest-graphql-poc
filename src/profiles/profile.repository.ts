import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { ProfileModel } from "./models/profile.model";
import { Profile, ProfileDocument } from "./mongo/profile.schema";

export class ProfileRepository {

    constructor(
        @InjectModel('Profile')
        private model: Model<ProfileDocument>) {}

    public async getProfileByEmail(email: string): Promise<ProfileModel> {
        let result: ProfileModel;
        Object.assign(result, await this.model.findOne({ email }).exec());
        return result;
    }

    public async create(input: CreateProfileInput): Promise<string> {
        const model = new this.model(input);
        let result = await model.save();
        return result._id.toString();
    }
}