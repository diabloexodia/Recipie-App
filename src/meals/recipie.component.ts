import { Component, Input, OnDestroy } from '@angular/core';
import {
  getRecipieType,
  modifiedRecipieType,
} from 'src/app/shared/Models/RecipieModels/RecipieType.interface';
import { MealServicesService } from '../app/shared/services/meal-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipie',
  templateUrl: './recipie.component.html',
  styleUrls: ['./recipie.component.scss'],
})
export class RecipieComponent implements OnDestroy {
  safeURL: SafeResourceUrl = '';
  displayContent: boolean = false;
  mealsArray: modifiedRecipieType = {} as modifiedRecipieType;
  constructor(
    private mealsService: MealServicesService,
    private _sanitizer: DomSanitizer
  ) {
    const mealsSubscription = this.mealsService.mealsArray$.subscribe(
      (data) => {
        this.mealsArray = data;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
          this.mealsArray.strYoutube
        );
        console.log('called', this.mealsArray.strYoutube);
      }
    );
    this.subscriptions.push(mealsSubscription);
  }

  subscriptions: Subscription[] = [];

  /**
   * Unsubscribes to the subsciption on destroying the component
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  /**
   * This function subscribes to the getData() in the meals.services everytime
   * the button is clicked. It then passes that data to another function that converts 
   * the recieved data to the required format.
   */
  getRecipieData() {
    this.displayContent = true;
    const getDataSubscription = this.mealsService.getData().subscribe((data) => {
      this.convertData(data);

      console.log(this.mealsArray);
    });

    this.subscriptions.push(getDataSubscription);
  }


  /**
   * This function converts the data to the requred format and then pushes
   * it into an observable which, is subscribes to in the constrctor. 
   * @param data 
   */
  convertData(data: getRecipieType) {
    const ingredients: string[] = [];
    const measurements: string[] = [];
    let tags: string[] = [];
    Object.entries(data.meals[0]).forEach(([key, value]) => {
      if (
        key.includes('strIngredient') &&
        value !== '' &&
        value != ' ' &&
        value !== null
      ) {
        ingredients.push(value);
      } else if (key.includes('strMeasure') && value != '') {
        if (value !== null && value !== '' && value !== ' ')
          measurements.push(value);
      } else if (key.includes('strTags') && value != '') {
        if (value !== null && value !== '' && value !== ' ')
          tags = value.split(',');
      } else if (value != null)
        Object.assign(this.mealsArray, { [key]: value });
    });

    Object.assign(this.mealsArray, { ['ingredients']: ingredients });
    Object.assign(this.mealsArray, { ['measurements']: measurements });
    Object.assign(this.mealsArray, { ['strTags']: tags });
    Object.assign(this.mealsArray, {
      ['strInstructions']: this.mealsArray.strInstructions.split('.' || '\n'),
    });
    Object.assign(this.mealsArray, {
      ['strYoutube']: embedVideo(this.mealsArray.strYoutube),
    });
    this.mealsService.mealsArray$.next(this.mealsArray);
  }
}

/**
 * This function converts the YT video to embed format
 * @param strYoutube 
 * @returns 
 */
function embedVideo(strYoutube: string): string {
  var re = /watch\?v=/gi;

  // Use of String replace() Method
  let newstr = strYoutube.replace(re, 'embed/');

  return newstr;
}
