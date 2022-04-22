import { Component, OnInit } from "@angular/core";

import { Movie } from "../movie";
import { MovieService } from "../movie.service";

function comparator(a: Movie, b: Movie): number {
    if (a.rating > b.rating) {
        return -1;
    } else if (a.rating < b.rating) {
        return 1;
    } else {
        return 0;
    }
}

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    movies: Movie[] = [];

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.movies = this.movieService.getMovies({}).sort(comparator).slice(0, 5);
    }
}
