import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ContentChild,
  AfterViewInit,
  AfterContentInit
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent
  implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  @Input("srvElement") element: { type: string; name: string; content: string };
  @Input() name: string;
  @ViewChild("heading", { static: true }) header: ElementRef;
  @ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    console.log(
      "Paragraph content after content init: ",
      this.paragraph.nativeElement.textContent
    );
  }

  ngAfterViewInit() {
    console.log(
      "Header content after view init: ",
      this.header.nativeElement.textContent
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }
}
