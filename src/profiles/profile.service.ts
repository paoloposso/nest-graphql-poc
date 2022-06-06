import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileRepository } from "./profile.repository";

export class ProfileService {

    constructor(private repository: ProfileRepository) {}

    public async getProfileById(id: string): Promise<Profile> {
        return this.repository.getProfileById(id);
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