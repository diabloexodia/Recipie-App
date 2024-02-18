import { Component, Input } from '@angular/core';
import { modifiedRecipieType } from 'src/app/shared/Models/RecipieModels/RecipieType.interface';
import { MealServicesService } from '../../../shared/services/meal-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-recipie',
  templateUrl: './recipie.component.html',
  styleUrls: ['./recipie.component.scss'],
})
export class RecipieComponent {
 
  safeURL:SafeResourceUrl='';
  mealsArray: modifiedRecipieType = {} as modifiedRecipieType;
  constructor(
    private mealsService: MealServicesService,
    private _sanitizer: DomSanitizer
  ) {
    this.mealsService.mealsArray$.subscribe((data) => {
      this.mealsArray = data;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.mealsArray.strYoutube);
      console.log('called', this.mealsArray.strYoutube);
    });
  }
}
