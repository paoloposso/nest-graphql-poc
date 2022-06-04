import { Args, Int, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from "@nestjs/graphql";
import { Profile } from "./models/profile.model";
import { ProfileService } from "./profile.service";

@Resolver(of => Profile)
export class ProfileResolver {
  constructor(private service: ProfileService) {}

  @Query(returns => Profile, { name: 'profile' })
  async getProfile(@Args('id', { type: () => Int }) id: string) {
    return await this.service.getProfileById(id);
  }

  // @ResolveField('posts', returns => [Post])
  // async getPosts(@Parent() author: Author): Promise<Post[]> {
  //   return await this.postsService.findAllByAuthorId(author.id);
  // }

  // @Mutation(returns => Post)
  // async upvotePost(@Args({ name: 'input', type: () => UpvotePostInput }) input: UpvotePostInput) {
  //   return this.postsService.upvoteById(input.postId);
  // }
}