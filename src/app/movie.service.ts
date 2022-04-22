import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MessageService } from "./message.service";
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

    constructor(private messageService: MessageService, private http: HttpClient) {}

    getMovies(query: Query): Observable<Movie[]> {
        this.messageService.add("MovieService: fetched movies");
        const queryParams = Object.entries(query)
            .filter(([key, value]) => key && value)
            .map(([key, value]) => {
                switch (typeof value) {
                    case "number":
                        return `${key}=${value}`;
                    case "boolean":
                        return `${key}=${value}`;
                    case "string":
                        return `${key}_like=${value}`;
                    default:
                        return "";
                }
            })
            .join("&");
        return this.http.get<Movie[]>(`${this.url}/movies?${queryParams}`);
    }

    addMovie(newMovie: NewMovie): Observable<Movie> {
        const movie = new Movie(newMovie);
        return this.http.post<Movie>(`${this.url}/movies`, movie, this.httpOptions);
    }

    updateMovie(movie: Movie): Observable<Movie> {
        return this.http.put<Movie>(`${this.url}/movies/${movie.id}`, movie, this.httpOptions);
    }

    deleteMovie(id: string): Observable<Movie> {
        return this.http.delete<Movie>(`${this.url}/movies/${id}`, this.httpOptions);
    }

    getMovie(id: string): Observable<Movie> {
        this.messageService.add(`MovieService: fetched movie id=${id}`);
        return this.http.get<Movie>(`${this.url}/movies/${id}`, this.httpOptions);
    }

    addToFavorites(id: string): Observable<Movie> {
        return this.http.put<Movie>(`${this.url}/movie/${id}`, { favorite: true }, this.httpOptions);
    }

    removeFromFavorites(id: string): Observable<Movie> {
        return this.http.put<Movie>(`${this.url}/movie/${id}`, { favorite: false }, this.httpOptions);
    }
}
