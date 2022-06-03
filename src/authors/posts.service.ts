import { getAllData } from "./data.mock";
import { Post } from "./models/posts.model";

export class PostsService {

    posts: Array<Post>;

    constructor() {
        this.posts = Array<Post>();
    }

    public async findAllByAuthorId(authorId: number): Promise<Post[]> {
        const result = (await getAllData()).find(author => author.id === authorId);

        if (result && result.posts && result.posts.length > 0)
            return result.posts;
        return [];
    }

    public async upvoteById(id: number) {
        return { title: 'asdsdsa1', id } as Post;
    }
}