import { Connection, Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { ProfileModel } from "./models/profile.model";
import { ProfileDocument } from "./mongo/profile.schema";
import { ProfileRepository } from "./profile.repository";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

describe('ProfileResolver', () => {
    let resolver: ProfileResolver;
    let service: ProfileService;

    beforeEach(() => {
        service = new ProfileService(new ProfileRepository({} as Model<ProfileDocument, {}>), {} as Model<ProfileDocument, {}>);
        resolver = new ProfileResolver(service);
    });

    describe('getProfileById', () => {
        it ('should return a profile', async () => {
            jest.spyOn(service, 'getProfileByEmail').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve(new ProfileModel({email: 'pvictorsys@gmail.com'}));
                });
            });

            expect((await resolver.getProfile('1')).email).toEqual('pvictorsys@gmail.com');
        });
    });

    describe('createProfile', () => {
        it ('should return id for new profile', async () => {
            jest.spyOn(service, 'create').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve('id123');
                });
            });

            let input = new CreateProfileInput();
            input.email = 'test@test.com';

            let respose = await resolver.createProfile(input);

            expect(respose.length).toBeGreaterThan(1);
        });
    });
});