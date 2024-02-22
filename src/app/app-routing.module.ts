import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'',redirectTo:'recipe',pathMatch:'full'},
  { path: 'recipe', loadChildren: () => import('../meals/meals.module').then(m => m.mealsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
