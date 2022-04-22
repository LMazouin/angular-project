import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MoviesComponent } from "./movies/movies.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MessagesComponent } from "./messages/messages.component";
import { MovieFormComponent } from "./movie-form/movie-form.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FavoritesComponent } from './favorites/favorites.component';
import { ModalComponent } from './modal/modal.component';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        MovieDetailComponent,
        MessagesComponent,
        MovieFormComponent,
        DashboardComponent,
        FavoritesComponent,
        ModalComponent,
        FiltersComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
