export interface MovieInterface {
    id: string;
    name: string;
    description?: string;
    category: string;
    rating: number;
    watched: boolean;
    favorite: boolean;
}
