import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.css"],
})
export class FiltersComponent implements OnInit {
    movieFilter = new FormGroup({
        name: new FormControl(""),
        category: new FormControl(""),
        rating: new FormControl(""),
    });

    @Output() submitEvent = new EventEmitter<{ name?: string; category?: string; rating?: number }>();

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            this.movieFilter.patchValue(params);
        });
    }

    onSubmit(): void {
        const { name, category, rating } = this.movieFilter.value;
        this.submitEvent.emit({ name, category, rating });
        this.router.navigate([], { queryParams: { name, category, rating } });
    }

    ngOnInit(): void {}
}
