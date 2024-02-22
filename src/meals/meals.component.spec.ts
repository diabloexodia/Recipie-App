import { ComponentFixture, TestBed } from '@angular/core/testing';

import { mealsComponent } from './meals.component';

describe('recipeComponent', () => {
  let component: mealsComponent;
  let fixture: ComponentFixture<mealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [mealsComponent]
    });
    fixture = TestBed.createComponent(mealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
