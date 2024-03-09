import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdComponent } from './purchase-ord.component';

describe('PurchaseOrdComponent', () => {
  let component: PurchaseOrdComponent;
  let fixture: ComponentFixture<PurchaseOrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
