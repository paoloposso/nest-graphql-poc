import { Author } from "./models/authors.model";
import { Post } from "./models/posts.model";

export const getAllData = async (): Promise<Array<Author>> => {
    let result = new Array<Author>();

    result.push({ 
        id: 1, 
        firstName: 'Paolo',
        lastName: 'Posso',
        posts: [
            { id: 1, title: 'A title', votes: 50 } as Post,
            { id: 2, title: 'Typescript 2', votes: 50 } as Post,
            { id: 3, title: 'Rust for Beginers', votes: 50 } as Post,
        ]
    } as Author);

    result.push({ 
        id: 2, 
        firstName: 'Thayna',
        lastName: 'Santos',
        posts: [
            { id: 4, title: 'C# in Depth', votes: 50 } as Post,
            { id: 5, title: 'Typescript Vol 34', votes: 50 } as Post,
        ]
    } as Author);
    
    // result.push({ 
    //     id: 3, 
    //     firstName: 'Wilson',
    //     lastName: 'Silva',
    // } as Author);

    return result;
}