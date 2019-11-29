import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"]
})
export class GameControlComponent implements OnInit {
  @Output() oddCreated = new EventEmitter<{ time: number }>();
  @Output() evenCreated = new EventEmitter<{ time: number }>();
  time: number = 0;
  intervalVar: NodeJS.Timeout;

  constructor() {}

  ngOnInit() {}

  onStart() {
    this.intervalVar = setInterval(() => {
      this.time += 1;
      if (this.time % 2 === 0) {
        this.evenCreated.emit({ time: this.time });
      } else {
        this.oddCreated.emit({ time: this.time });
      }
    }, 1000);
  }

  onStop() {
    if (this.intervalVar) {
      clearInterval(this.intervalVar);
    }
  }
}
