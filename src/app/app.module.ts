import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CoreModule } from "./core/core.module";
import { AuthEffects } from "./auth/store/auth.effects";
import { RecipesEffects } from './recipes/store/recipe.effects';

import * as fromApp from "./store/app.reducer";

@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
