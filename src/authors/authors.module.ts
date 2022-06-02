import { Module } from "@nestjs/common";
import { PostsService } from "src/authors/posts.service";
import { AuthorsResolver } from "./authors.resolver";
import { AuthorsService } from "./authors.service";

@Module({
    providers: [ AuthorsResolver, AuthorsService, PostsService],
})
export class AuthorsModule {}
