import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MessageService } from "../message.service";

import { Movie } from "../movie";
import { MovieService } from "../movie.service";

@Component({
    selector: "app-movies",
    templateUrl: "./movies.component.html",
    styleUrls: ["./movies.component.css"],
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];
    movieFilter = new FormGroup({
        name: new FormControl(""),
        category: new FormControl(""),
        rating: new FormControl(""),
    });

    isOpenModal: boolean = false;

    constructor(private movieService: MovieService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.getMovies({});
    }

    onSubmit(): void {
        const { name, category, rating } = this.movieFilter.value;
        this.messageService.add(`filter movies by ${name}`);
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
