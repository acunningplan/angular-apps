import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {}

  ngOnDestroy() {}
}

// import { Component, OnInit } from "@angular/core";

// @Component({
//   selector: "app-header",
//   templateUrl: "./header.component.html"
// })
// export class HeaderComponent implements OnInit {
//   constructor() {}

//   ngOnInit() {}
// }
