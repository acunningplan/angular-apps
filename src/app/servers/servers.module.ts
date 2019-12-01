import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ServerElementComponent } from "./server-element/server-element.component";
import { CockpitComponent } from "./cockpit/cockpit.component";
import { ServersComponent } from "./servers.component";

@NgModule({
  declarations: [ServersComponent, ServerElementComponent, CockpitComponent],
  exports: [ServersComponent, ServerElementComponent, CockpitComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [ServersComponent]
})
export class ServersModule {}
