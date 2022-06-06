import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileDb, ProfileDocument } from "./mongo/profile.schema";

export class ProfileRepository {
    constructor(
        @InjectModel(ProfileDb.name) 
        private profileModel: Model<ProfileDocument>
    ) {}

    public async getProfileById(id: string): Promise<Profile> {
        let result: Profile;
        
        Object.assign(result, await this.profileModel.findById(id).exec());

        return result;
    }

    public async create(input: CreateProfileInput): Promise<string> {
        const model = new this.profileModel(input);
        return (await model.save()).id;
    }
}