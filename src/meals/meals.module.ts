import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recipeRoutingModule } from './meals-routing.module';
import { mealsComponent } from './meals.component';
import { RecipeComponent } from './Pages/recipe/recipe.component';

@NgModule({
  declarations: [mealsComponent, RecipeComponent],
  imports: [CommonModule, recipeRoutingModule],
})
export class mealsModule {}
