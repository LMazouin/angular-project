import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieFormComponent } from "./movie-form/movie-form.component";
import { MoviesComponent } from "./movies/movies.component";

const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "movies", component: MoviesComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "detail/:id", component: MovieDetailComponent },
    { path: "movie/create", component: MovieFormComponent },
    { path: "favorites", component: FavoritesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
