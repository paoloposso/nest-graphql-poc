import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { ProfileModel } from "./models/profile.model";
import { ProfileService } from "./profile.service";

@Resolver(of => ProfileModel)
export class ProfileResolver {
  constructor(private service: ProfileService) {}

  @Query(returns => ProfileModel, { name: 'profile' })
  async getProfile(@Args('id', { type: () => String }) email: string) {
    return await this.service.getProfileByEmail(email);
  }

  @Mutation(returns => String)
  async createProfile(@Args({ name: 'input', type: () => CreateProfileInput }) input: CreateProfileInput) {
    return this.service.create(new ProfileModel(input));
  }
}