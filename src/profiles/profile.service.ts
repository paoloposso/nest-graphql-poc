import { ProfileModel } from "./models/profile.model";
import { ProfileRepository } from "./profile.repository";
import { Injectable } from "@nestjs/common";
import * as moment from "moment";

@Injectable()
export class ProfileService {

    constructor(private repository: ProfileRepository) {}
    
    public async getProfileByEmail(email: string): Promise<ProfileModel> {
        return this.repository.getByEmail(email);
    }

    public async getProfileById(id: string): Promise<ProfileModel> {
        return this.repository.getById(id);
    }

    public async create(profile: ProfileModel): Promise<string> {
        let errors: string[] = [];

        this.validateCreateProfileInput(profile, errors);

        profile.registered = this.getUtcDate(profile);

        return this.repository.create(profile);
    }

    private getUtcDate(profile: ProfileModel) : Date {
        return new Date();
    }

    private validateCreateProfileInput(profile: ProfileModel, errors: string[]) {
        if (!profile.email || profile.email.length === 0) {
            errors.push('Email is required');
        }
        if (!profile.name || profile.name.length === 0) {
            errors.push('Name is required');
        }
        if (errors.length > 0) {
            throw new Error(errors.join(';'));
        }
    }
}