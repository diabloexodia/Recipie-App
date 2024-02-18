import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieComponent } from './recipie.component';

describe('RecipieComponent', () => {
  let component: RecipieComponent;
  let fixture: ComponentFixture<RecipieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipieComponent]
    });
    fixture = TestBed.createComponent(RecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
