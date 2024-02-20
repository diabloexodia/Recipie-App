import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'',redirectTo:'Recipie',pathMatch:'full'},
  { path: 'Recipie', loadChildren: () => import('../meals/meals.module').then(m => m.RecipieModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
