import { Profile } from "./models/profile.model";

export class ProfileService {

    constructor() {}

    public async getProfile(id: string): Promise<Profile> {
        return new Profile({id, email: 'pvictorsys@gmail.com' });
    }
}