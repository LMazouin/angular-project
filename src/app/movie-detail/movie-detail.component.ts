import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Movie } from "../movie";
import { MovieService } from "../movie.service";

@Component({
    selector: "app-movie-detail",
    templateUrl: "./movie-detail.component.html",
    styleUrls: ["./movie-detail.component.css"],
})
export class MovieDetailComponent implements OnInit {
    movie: Movie | undefined;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private location: Location,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getMovie();
    }

    getMovie(): void {
        const id = this.route.snapshot.paramMap.get("id") || "";
        this.movie = this.movieService.getMovie(id);
    }

    deleteMovie(): void {
        this.movieService.deleteMovie(this.movie?.id || "");
        this.router.navigate(["movies"]).then(() => {
            window.location.reload();
        });
    }

    addToFavorites(): void {
        if (this.movie) this.movieService.addToFavorites(this.movie);
        this.router.navigate(["favorites"]).then(() => {
            window.location.reload();
        });
    }

    removeFromFavorites(): void {
        if (this.movie) this.movieService.removeFromFavorites(this.movie);
        this.router.navigate(["favorites"]).then(() => {
            window.location.reload();
        });
    }

    goBack(): void {
        this.location.back();
    }
}
