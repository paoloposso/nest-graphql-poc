import { Post } from "./models/posts.model";

export class PostsService {
    public async findAll(authorId: number): Promise<[Post]> {
        return null;
    }
}