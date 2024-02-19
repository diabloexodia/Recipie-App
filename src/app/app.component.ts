import { Component } from '@angular/core';
import { MealServicesService } from './shared/services/meal-services.service';
import {
  getRecipieType,
  modifiedRecipieType,
} from './shared/Models/RecipieModels/RecipieType.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RecipieApp';

 
  // constructor(private mealService: MealServicesService) {}

  // mealsArray:modifiedRecipieType={}as modifiedRecipieType;

  // displayContent:boolean=false;
  // getRecipieData() {
  //   this.displayContent =true;
  //   this.mealService.getData().subscribe((data) => {
  //     const ingredients: string[] = [];
  //     const measurements: string[] = [];
  //     let tags: string[] = [];
  //     Object.entries(data.meals[0]).forEach(([key, value]) => {
  //       if (key.includes('strIngredient') && value !== '' && (value!=' ') && value !== null) {
         
  //           ingredients.push(value);
  //       } else if (key.includes('strMeasure') && (value!='')) {
  //         if (value !== null && value !== '' && value !== ' ')
  //           measurements.push(value);
         

  //       }
  //       else if(key.includes('strTags') && (value!='')){
  //         if (value !== null && value !== '' && value !== ' ')
  //                tags=value.split(',');
  //       }
  //       else if (value != null)
  //         Object.assign(this.mealsArray, { [key]: value });
  //     });

  //     Object.assign(this.mealsArray, { ['ingredients']: ingredients });
  //     Object.assign(this.mealsArray, { ['measurements']: measurements });
  //     Object.assign(this.mealsArray, { ['strTags']: tags});
  //     Object.assign(this.mealsArray, { ['strInstructions']: this.mealsArray.strInstructions.split('.'||'\n') });
  //     Object.assign(this.mealsArray, { ['strYoutube']: embedVideo(this.mealsArray.strYoutube) });
  //     this.mealService.mealsArray$.next(this.mealsArray);
  //       console.log("Tags are " ,tags);
  //     console.log(this.mealsArray);
  //   });
  // }
}
// function embedVideo(strYoutube: string): string {
   
  
//   var re = /watch\?v=/gi;  

//   // Use of String replace() Method 
//   let newstr = strYoutube.replace(re, "embed/");
  
//   return newstr
  
// }

