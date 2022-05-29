import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "src/posts/models/post.model";
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
  async getAuthor(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.authorsService.findOneById(id);
  }

  @ResolveField(returns => Post)
  async getPosts(@Parent() author: Author) : Promise<Post[]> {
    const { id } = author;
    return this.postsService.findAll(id);
  }
}