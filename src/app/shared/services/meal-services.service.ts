import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { getRecipieType, modifiedRecipieType } from '../Models/RecipieModels/RecipieType.interface';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MealServicesService {

  constructor(private http:HttpClient) { }

  mealsArray$: Subject<modifiedRecipieType> = new Subject();

  getData():Observable<getRecipieType>{
    const url= 'https://www.themealdb.com/api/json/v1/1/random.php';
    return this.http.get<getRecipieType>(url)
  }
}
