import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OHComponent } from './home/home.component';
import { OUComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: OHComponent},
  {path: 'user/:id', component: OUComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ObservablesRoutingModule {

}
