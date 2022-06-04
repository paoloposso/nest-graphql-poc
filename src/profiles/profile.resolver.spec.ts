import { ProvidedRequiredArgumentsOnDirectivesRule } from "graphql/validation/rules/ProvidedRequiredArgumentsRule";
import { Model } from "mongoose";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileDocument } from "./mongo/profile.schema";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

describe('ProfileResolver', () => {
    let resolver: ProfileResolver;
    let service: ProfileService;

    beforeEach(() => {
        service = new ProfileService({} as Model<ProfileDocument>);
        resolver = new ProfileResolver(service);
    });

    describe('getProfileById', () => {
        it ('should return a profile', async () => {
            jest.spyOn(service, 'getProfileById').mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve(new Profile({email: 'pvictorsys@gmail.com'}));
                });
            });

            expect((await resolver.getProfile('1')).email).toEqual('pvictorsys@gmail.com');
        });
    });

    describe('getProfileById', () => {
        it ('should return a profile', async () => {
            jest.spyOn(service, 'create').mockImplementation(() => {
                return new Promise((resolve, reject) => {
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