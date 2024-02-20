import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipieRoutingModule } from './recipie-routing.module';
import { RecipieComponent } from './recipie.component';

@NgModule({
  declarations: [RecipieComponent],
  imports: [CommonModule, RecipieRoutingModule],
})
export class RecipieModule {}
