import { CreateProfileInput } from "./dto/create-profile.input";
import { Profile } from "./models/profile.model";

export class ProfileService {

    constructor() {}

    public async getProfileById(id: string): Promise<Profile> {
        return new Profile({id, email: 'pvictorsys@gmail.com' });
    }

    public async createProfile(input: CreateProfileInput): Promise<string> {
        return '1111j1klj1';
    }
}