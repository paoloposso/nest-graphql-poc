import { Args, Int, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from "@nestjs/graphql";
import { CreateProfileInput } from "./inputs/create-profile.input";
import { Profile } from "./models/profile.model";
import { ProfileService } from "./profile.service";

@Resolver(of => Profile)
export class ProfileResolver {
  constructor(private service: ProfileService) {}

  @Query(returns => Profile, { name: 'profile' })
  async getProfile(@Args('id', { type: () => Int }) id: string) {
    return await this.service.getProfileById(id);
  }

  @Mutation(returns => String)
  async createProfile(@Args({ name: 'input', type: () => CreateProfileInput }) input: CreateProfileInput) {
    let errors: string[] = [];

    if (!input.email || input.email.length === 0) {
        errors.push('Email is required');
    }
    if (errors.length > 0) {
        throw new Error(errors.join(';'));
    }

    return this.service.create(input);
  }
}