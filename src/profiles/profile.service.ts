import { Profile } from "./models/profile.model";

export class ProfileService {

    constructor() {}

    public async getProfileById(id: string): Promise<Profile> {
        return new Profile({id, email: 'pvictorsys@gmail.com' });
    }
}