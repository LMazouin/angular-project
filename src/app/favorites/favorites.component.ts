import { Component, OnInit } from "@angular/core";
import { Movie } from "../movie";
import { MovieService } from "../movie.service";

@Component({
    selector: "app-favorites",
    templateUrl: "./favorites.component.html",
    styleUrls: ["./favorites.component.css"],
})
export class FavoritesComponent implements OnInit {
    favorites: Movie[] = [];

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.getFavorites({});
    }
    getFavorites(query: { name?: string; category?: string; rating?: number }): void {
        this.favorites = this.movieService.getMovies({ ...query, favorite: true });
    }
}
