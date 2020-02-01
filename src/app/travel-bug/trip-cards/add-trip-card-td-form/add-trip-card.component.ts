import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-trip-card',
    templateUrl: './add-trip-card.component.html',
    styleUrls: ['./add-trip-card.component.css']
})
export class AddTripCardComponent implements OnInit {
    @ViewChild('f') form: NgForm;
    defaultQuestion = "pet";
    answer = "Your answer goes here"

    constructor() { }

    ngOnInit() {
    }

    //onSubmit(form: NgForm) {
    //    console.log(form)
    //}

    onSubmit() {
        console.log(this.form)
    }
}
