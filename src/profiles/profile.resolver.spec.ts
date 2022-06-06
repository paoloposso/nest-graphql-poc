import { Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileDocument } from "./mongo/profile.schema";
import { ProfileRepository } from "./profile.repository";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

describe('ProfileResolver', () => {
    let resolver: ProfileResolver;
    let service: ProfileService;
    let repository: ProfileRepository;

    beforeEach(() => {
        repository = new ProfileRepository({} as Model<ProfileDocument, {}>);
        service = new ProfileService(repository);
        resolver = new ProfileResolver(service);
    });

    describe('getProfileById', () => {
        it ('should return a profile', async () => {
            jest.spyOn(service, 'getProfileById').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve(new Profile({email: 'pvictorsys@gmail.com'}));
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