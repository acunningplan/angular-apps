import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpTestComponent } from "./http-test.component";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [HttpTestComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
  ],
  exports: [HttpTestComponent],
  bootstrap: [HttpTestComponent]
})
export class HttpTestModule {}
