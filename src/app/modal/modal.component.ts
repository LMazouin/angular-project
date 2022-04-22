import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
    @Input() open: boolean = true;
    @Output() closeModalEvent = new EventEmitter<boolean>();
    constructor() {}

    ngOnInit(): void {}

    onClose(isOpen: boolean): void {
        this.closeModalEvent.emit(false);
        this.open = false;
    }
}
