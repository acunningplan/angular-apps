import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
// import { AppRoutingModule } from "./app-routing.module";
import { TravelBugModule } from "./travel-bug/travel-bug.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, TravelBugModule],
    bootstrap: [AppComponent],
    exports: [],
    providers: []
})
export class AppModule { }
