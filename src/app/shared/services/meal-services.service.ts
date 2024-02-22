import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  getrecipeType,
  modifiedrecipeType,
} from '../Models/RecipeModels/RecipeType.interface';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MealServicesService {
  constructor(private http: HttpClient) {}

  mealsArray$: Subject<modifiedrecipeType> = new Subject();

  /**
   * This is a function that makes an HTTP GET request to the server
   * @returns an observable only once and then stops emitting
   */
  getData(): Observable<getrecipeType> {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    return this.http.get<getrecipeType>(url);
  }
}
