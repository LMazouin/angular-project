import { v4 as uuidv4 } from "uuid";
import { MovieInterface } from "./movie-interface";
import { NewMovie } from "./types";

export class Movie implements MovieInterface {
    id: string;
    name: string;
    description?: string;
    category: string;
    rating: number;
    favorite: boolean;
    watched: boolean;

    constructor(newMovie: NewMovie) {
        const { name, category, watched, rating } = newMovie;
        this.id = uuidv4();
        this.name = name;
        this.category = category;
        this.description = "";
        this.rating = rating;
        this.watched = watched;
        this.favorite = false;
    }
}
