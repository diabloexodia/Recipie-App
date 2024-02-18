import { TestBed } from '@angular/core/testing';

import { MealServicesService } from './meal-services.service';

describe('MealServicesService', () => {
  let service: MealServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
