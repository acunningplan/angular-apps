import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  oddList: number[] = [];
  evenList: number[] = [];

  constructor() {}

  ngOnInit() {}

  onOdd(data: { time: number }) {
    this.oddList.push(data.time)
  }

  onEven(data: { time: number }) {
    this.evenList.push(data.time)
  }
}
