import { TestBed } from '@angular/core/testing';

import { MyEshopService } from './my-eshop.service';

describe('MyEshopServiceService', () => {
  let service: MyEshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyEshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
