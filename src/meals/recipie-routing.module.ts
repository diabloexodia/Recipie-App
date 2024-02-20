import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipieComponent } from './recipie.component';

const routes: Routes = [{ path: '', component: RecipieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipieRoutingModule { }
