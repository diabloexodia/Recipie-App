import { Component, OnDestroy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  modifiedrecipeType,
  getrecipeType,
} from 'src/app/shared/Models/RecipeModels/RecipeType.interface';
import { MealServicesService } from 'src/app/shared/services/meal-services.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnDestroy {
  safeURL: SafeResourceUrl = '';
  displayContent = false;
  mealsArray: modifiedrecipeType = {} as modifiedrecipeType;
  subscriptions: Subscription[] = [];

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

  /**
   * Unsubscribes to the subscription on destroying the component
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
  getrecipeData(): void {
    this.displayContent = true;
    const getDataSubscription = this.mealsService
      .getData()
      .subscribe((data) => {
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
  convertData(data: getrecipeType): void {
    const ingredients: string[] = [];
    const measurements: string[] = [];
    let tags: string[] = [];

    /**
     * Gets each(key,value) pair from the object using a forEach loop
     */
    Object.entries(data.meals[0]).forEach(([key, value]) => {
      /**
       * This If-Else ladder pushes respective elements to
       * their corrosponding array
       */
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
  const re = /watch\?v=/gi;

  // Use of String replace() Method
  return strYoutube.replace(re, 'embed/');
}
