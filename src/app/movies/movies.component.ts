import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../event.service";

import { Movie } from "../movie";
import { MovieService } from "../movie.service";

@Component({
    selector: "app-movies",
    templateUrl: "./movies.component.html",
    styleUrls: ["./movies.component.css"],
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];

    isOpenModal: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private movieService: MovieService
    ) {}

    ngOnInit(): void {
        this.eventService.getMoviesEventListener().subscribe((movies) => (this.movies = movies));
        this.route.queryParams.subscribe((params) => {
            this.getMovies(params);
        });
    }

    onSubmit(query: { name?: string; category?: string; rating?: number }): void {
        const { name, category, rating } = query;
        this.getMovies({ name, category, rating });
    }

    getMovies({ name, category, rating }: { name?: string; category?: string; rating?: number }): void {
        this.movies = this.movieService.getMovies({ name, category, rating });
    }

    onClose(isOpen: boolean): void {
        this.isOpenModal = isOpen;
    }

    onOpen(): void {
        this.isOpenModal = true;
    }
}
