import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { ProfileModel } from "./models/profile.model";
import { ProfileRepository } from "./profile.repository";
import { ProfileDocument } from "./mongo/profile.schema";

export class ProfileService {

    constructor(private repository: ProfileRepository,
        @InjectModel('Profile')
        private model: Model<ProfileDocument>
    ) {}
        
    public async getProfileByEmail(email: string): Promise<ProfileModel> {
        return this.repository.getProfileByEmail(email);
    }

    public async create(input: CreateProfileInput): Promise<string> {
        let errors: string[] = [];

        if (!input.email || input.email.length === 0) {
            errors.push('Email is required');
        }
        if (errors.length > 0) {
            throw new Error(errors.join(';'));
        }
        return this.repository.create(input);
    }
}