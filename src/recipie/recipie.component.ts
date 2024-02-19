import { Component, Input } from '@angular/core';
import { modifiedRecipieType } from 'src/app/shared/Models/RecipieModels/RecipieType.interface';
import { MealServicesService } from '../app/shared/services/meal-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-recipie',
  templateUrl: './recipie.component.html',
  styleUrls: ['./recipie.component.scss'],
})
export class RecipieComponent {
 
  safeURL:SafeResourceUrl='';
  displayContent:boolean=false;
  mealsArray: modifiedRecipieType = {} as modifiedRecipieType;
  constructor(
    private mealService: MealServicesService,
    private mealsService: MealServicesService,
    private _sanitizer: DomSanitizer
  ) {

    this.mealsService.mealsArray$.subscribe((data) => {
      this.mealsArray = data;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.mealsArray.strYoutube);
      console.log('called', this.mealsArray.strYoutube);
    });
  }



  getRecipieData() {
     this.displayContent =true;
    this.mealService.getData().subscribe((data) => {
      const ingredients: string[] = [];
      const measurements: string[] = [];
      let tags: string[] = [];
      Object.entries(data.meals[0]).forEach(([key, value]) => {
        if (key.includes('strIngredient') && value !== '' && (value!=' ') && value !== null) {
         
            ingredients.push(value);
        } else if (key.includes('strMeasure') && (value!='')) {
          if (value !== null && value !== '' && value !== ' ')
            measurements.push(value);
         

        }
        else if(key.includes('strTags') && (value!='')){
          if (value !== null && value !== '' && value !== ' ')
                 tags=value.split(',');
        }
        else if (value != null)
          Object.assign(this.mealsArray, { [key]: value });
      });

      Object.assign(this.mealsArray, { ['ingredients']: ingredients });
      Object.assign(this.mealsArray, { ['measurements']: measurements });
      Object.assign(this.mealsArray, { ['strTags']: tags});
      Object.assign(this.mealsArray, { ['strInstructions']: this.mealsArray.strInstructions.split('.' || '\n') });
      Object.assign(this.mealsArray, { ['strYoutube']: embedVideo(this.mealsArray.strYoutube) });
      this.mealService.mealsArray$.next(this.mealsArray);
        console.log("Tags are " ,tags);
      console.log(this.mealsArray);
    });
  }
}
function embedVideo(strYoutube: string): string {
   
  
  var re = /watch\?v=/gi;  

  // Use of String replace() Method 
  let newstr = strYoutube.replace(re, "embed/");
  
  return newstr
  
}

