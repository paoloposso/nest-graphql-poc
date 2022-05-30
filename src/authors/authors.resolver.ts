import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/authors.model";
import { Post } from "./models/posts.model";
import { PostsService } from "./posts.service";

@Resolver(_ => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(_ => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts', _ => [Post])
  async getPosts(@Parent() author: Author): Promise<Array<Post>> {
    const { id } = author;
    return this.postsService.findAll(id);
  }
}