import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "src/posts/posts.service";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/authors.model";

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}