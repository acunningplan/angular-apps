import { Component, OnInit } from '@angular/core';
import { ITripCard } from '../interfaces/models';

@Component({
    selector: 'app-trip-cards',
    templateUrl: './trip-cards.component.html',
    styleUrls: ['./trip-cards.component.css']
})
export class TripCardsComponent implements OnInit {
    tripCards: ITripCard[] = [
        {
            name: "Bristol",
            description: "The city of Bristol is located in South West England.",
            image: "https://i2-prod.bristolpost.co.uk/incoming/article1819542.ece/ALTERNATES/s615/0_MYR_BRI_240718BRistolUni_03JPG.jpg"
        },
        {
            name: "Vienna",
            description: "The city of Vienna is the capital and most populous city of Austria",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh32M-VtHxrXW8K8cWNkmEN5lW716iSLY26dkrn1QpQR5kcnaP&s"
        },
    ]

    constructor() { }

    ngOnInit() {
    }

}
