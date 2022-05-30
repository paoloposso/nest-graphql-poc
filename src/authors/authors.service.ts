import { Author } from "./models/authors.model";

export class AuthorsService {

    authors: Array<Author>;

    constructor() {
        this.authors = new Array<Author>();

        this.authors.push({ 
            id: 1, 
            firstName: 'Paolo',
            lastName: 'Posso',
        } as Author);
        this.authors.push({ 
            id: 2, 
            firstName: 'Thayna',
            lastName: 'Santos',
        } as Author);
        this.authors.push({ 
            id: 3, 
            firstName: 'Wilson',
            lastName: 'Silva',
        } as Author);
    }

    public async findOneById(id: number): Promise<Author> {
        let result = {} as Author;
        let filtered = this.authors.find(u => u.id === id);
        if (filtered) result = filtered;

        return result;
    }
}