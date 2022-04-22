import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MessageService } from "./message.service";
import { LocalStorageService } from "./localstorage.service";
import { Movie } from "./movie";
import { NewMovie } from "./types";

type Query = {
    name?: string;
    category?: string;
    rating?: number;
    favorite?: boolean;
};

@Injectable({
    providedIn: "root",
})
export class MovieService {
    url: string = "http://localhost:3000";
    httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private localStorageService: LocalStorageService,
        private messageService: MessageService,
        private http: HttpClient
    ) {}

    getMovies(query: Query): Movie[] {
        return this.localStorageService.getMovies();
    }

    addMovie(newMovie: NewMovie): void {
        const movie = new Movie(newMovie);
        this.localStorageService.addMovie(movie);
    }

    updateMovie(movie: Movie): void {
        this.localStorageService.updateMovie(movie);
    }

    deleteMovie(id: string): void {
        this.localStorageService.deleteMovie(id);
    }

    getMovie(id: string): Movie | undefined {
        this.messageService.add(`MovieService: fetched movie id=${id}`);
        return this.localStorageService.getMovie(id);
    }

    addToFavorites(movie: Movie): void {
        this.localStorageService.updateMovie({ ...movie, favorite: true });
    }

    removeFromFavorites(movie: Movie): void {
        this.localStorageService.updateMovie({ ...movie, favorite: false });
    }
}
