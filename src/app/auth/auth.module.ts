import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [{ path: "", component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
  // providers: [
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi: true
  // }
  // ]
})
export class AuthModule {}
