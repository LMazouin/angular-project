import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Movie } from "./movie";

@Injectable({
    providedIn: "root",
})
export class EventService {
    private getMoviesEvent = new BehaviorSubject<Movie[]>([]);

    constructor() {}

    emitGetMoviesEvent(movies: Movie[]): void {
        this.getMoviesEvent.next(movies);
    }

    getMoviesEventListener(): Observable<Movie[]> {
        return this.getMoviesEvent.asObservable();
    }
}
