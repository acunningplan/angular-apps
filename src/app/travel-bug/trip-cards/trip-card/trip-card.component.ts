import { Component, Input, OnInit } from '@angular/core';
import { ITripCard } from '../../interfaces/models';

@Component({
    selector: 'app-trip-card',
    templateUrl: './trip-card.component.html',
    styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

    @Input() tripCard: ITripCard;
    isOpaque = false;

    constructor() { }

    ngOnInit() {
    }

    onDelete() {
        this.isOpaque = true;
        console.log('clicked');
    }
}
