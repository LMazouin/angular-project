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
        this.movieService.getMovie(id).subscribe((movie: Movie) => (this.movie = movie));
    }

    deleteMovie(): void {
        this.movieService.deleteMovie(this.movie?.id || "").subscribe((movie) => console.log(movie));
        this.router.navigate(["movies"]).then(() => {
            window.location.reload();
        });
    }

    addToFavorites(): void {
        this.movieService.addToFavorites(this.movie?.id || "").subscribe((favorite) => console.log(favorite));
        this.router.navigate(["favorites"]).then(() => {
            window.location.reload();
        });
    }

    removeFromFavorites(): void {
        this.movieService.removeFromFavorites(this.movie?.id || "").subscribe((favorite) => console.log(favorite));
        this.router.navigate(["favorites"]).then(() => {
            window.location.reload();
        });
    }

    goBack(): void {
        this.location.back();
    }
}
