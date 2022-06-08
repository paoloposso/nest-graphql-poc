import { Connection, Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { ProfileModel } from "./models/profile.model";
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
            jest.spyOn(repository, 'getProfileByEmail').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve(new ProfileModel({email: 'pvictorsys@gmail.com'}));
                });
            });

            expect((await service.getProfileByEmail('pvictorsys@gmail.com')).email).toEqual('pvictorsys@gmail.com');
        });
    });

    describe('createProfile', () => {
        it ('should return id for new profile', async () => {
            jest.spyOn(repository, 'create').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve('id123');
                });
            });

            let profile = new ProfileModel();
            profile.email = 'test@test.com';
            profile.name = 'test';

            let respose = await service.create(profile);

            expect(respose.length).toBeGreaterThan(1);
        });

        it ('should fail when email is empty', async () => {
            jest.spyOn(repository, 'create').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve('id123');
                });
            });

            let profile = new ProfileModel();
            profile.email = 'pvictorsys@gmail.com';
            profile.name = '';

            try {

                await service.create(profile);
                fail('should have validated blank name');
            } catch (e) {
                let err = e as Error;
                expect(err.message.toLowerCase().includes('name')).toBeTruthy();
            }
        });

        it ('should fail when email is blank', async () => {
            jest.spyOn(repository, 'create').mockImplementation(() => {
                return new Promise((resolve, _reject) => {
                    resolve('id123');
                });
            });

            let profile = new ProfileModel();
            profile.email = '';

            try {
                await service.create(profile);
                fail('should have validated email');
            } catch (e) {
                let message = ((e as Error).message);
                expect(message.toLowerCase().includes('email is required')).toBeTruthy();
            }
        });
    });
});