import { Injectable } from "@angular/core";
import { Movie } from "./movie";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    constructor() {}

    getMovies(query: { name?: string; category?: string; rating?: number; favorite?: boolean } = {}): Movie[] {
        const movies = JSON.parse(localStorage.getItem("movies") || "[]");

        if (Object.keys(query).length > 0 && !Object.values(query).every((value) => !value)) {
            return movies.filter((movie: any) =>
                Object.entries(query).some(([key, value]: [string, string | boolean | number]) => movie[key] === value)
            );
        }

        return movies;
    }

    setMovies(movies: Movie[]): void {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    getMovie(id: string): Movie | undefined {
        const movies = this.getMovies();
        return movies.find((movie: Movie) => movie.id === id);
    }

    addMovie(movie: Movie): void {
        const movies = this.getMovies();
        movies.push(movie);
        this.setMovies(movies);
    }

    updateMovie(updatedMovie: Movie): void {
        const movies = this.getMovies();
        const movieIndex = movies.findIndex((movie: Movie) => movie.id === updatedMovie.id);
        movies[movieIndex] = updatedMovie;
        this.setMovies(movies);
    }

    deleteMovie(id: string): void {
        const movies = this.getMovies();
        const movieIndex = movies.findIndex((movie: Movie) => movie.id === id);
        movies.splice(movieIndex, 1);
        this.setMovies(movies);
    }
}
