import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-trip-card-td',
    templateUrl: './add-trip-card-td.component.html',
    styleUrls: ['./add-trip-card-td.component.css']
})
export class AddTripCardTdComponent implements OnInit {
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
