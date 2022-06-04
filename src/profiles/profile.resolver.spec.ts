import { ProvidedRequiredArgumentsOnDirectivesRule } from "graphql/validation/rules/ProvidedRequiredArgumentsRule";
import { Profile } from "./models/profile.model";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

describe('ProfileResolver', () => {
    let resolver: ProfileResolver;
    let service: ProfileService;

    beforeEach(() => {
        service = new ProfileService();
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
});