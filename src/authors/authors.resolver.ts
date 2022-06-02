import { Args, Int, Parent, Query, ResolveField, ResolveProperty, Resolver } from "@nestjs/graphql";
import { title } from "process";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/authors.model";
import { Post } from "./models/posts.model";
import { PostsService } from "./posts.service";

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(returns => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return await this.authorsService.findOneById(id);
  }

  @ResolveField('posts', returns => [Post])
  async getPosts(@Parent() author: Author): Promise<Post[]> {
    return await this.postsService.findAllByAuthorId(author.id);
  }
}