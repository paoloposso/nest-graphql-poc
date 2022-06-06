import { Connection, Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileDocument } from "./mongo/profile.schema";
import { ProfileRepository } from "./profile.repository";
import { ProfileService } from "./profile.service";

describe('ProfileService', () => {
    let service: ProfileService;
    let repository: ProfileRepository;

    beforeAll(() => {
        repository = new ProfileRepository({} as Model<ProfileDocument, {}, {}>);
        service = new ProfileService(repository);
    });

    describe('getProfileById', () => {
        it ('should return a profile', async () => {
            jest.spyOn(repository, 'getProfileById').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve(new Profile({email: 'pvictorsys@gmail.com'}));
                });
            });

            expect((await service.getProfileById('1')).email).toEqual('pvictorsys@gmail.com');
        });
    });

    describe('createProfile', () => {
        it ('should return id for new profile', async () => {
            jest.spyOn(repository, 'create').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve('id123');
                });
            });

            let input = new CreateProfileInput();
            input.email = 'test@test.com';

            let respose = await service.create(input);

            expect(respose.length).toBeGreaterThan(1);
        });

        it ('should fail when email is blank', async () => {
            jest.spyOn(repository, 'create').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve('id123');
                });
            });

            let input = new CreateProfileInput();
            input.email = '';

            try {
                let respose = await service.create(input);
                fail('should have validated email');
            } catch (e) {
                let message = ((e as Error).message);
                expect(message.toLowerCase().includes('email is required')).toBeTruthy();
            }
        });
    });
});