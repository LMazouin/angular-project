import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../event.service";
import { MovieService } from "../movie.service";

@Component({
    selector: "app-movie-form",
    templateUrl: "./movie-form.component.html",
    styleUrls: ["./movie-form.component.css"],
})
export class MovieFormComponent implements OnInit {
    movieForm = new FormGroup({
        name: new FormControl(""),
        category: new FormControl(""),
        watched: new FormControl(""),
        rating: new FormControl(""),
    });
    id: string = "";
    isNewMovie: boolean = true;

    ratings = [1, 2, 3, 4, 5];

    @Output() closeModalEvent = new EventEmitter<boolean>();

    constructor(
        private eventService: EventService,
        private movieService: MovieService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params["id"];
        this.isNewMovie = !this.id;

        if (!this.isNewMovie) {
            const movie = this.movieService.getMovie(this.id);
            this.movieForm.patchValue(movie || {});
        }
    }

    onSubmit(): void {
        this.closeModalEvent.emit(false);
        const { name, category, watched, rating } = this.movieForm.value;
        if (this.isNewMovie) {
            this.movieService.addMovie({ name, category, watched, rating: watched ? rating : 0 });
            const movies = this.movieService.getMovies({});
            this.eventService.emitGetMoviesEvent(movies);
        } else {
            this.movieService.updateMovie({
                id: this.id,
                name,
                category,
                watched,
                rating: watched ? rating : 0,
                favorite: false,
            });
            const movies = this.movieService.getMovies({});
            this.eventService.emitGetMoviesEvent(movies);
            this.router.navigate(["movies"]);
        }
    }
}
