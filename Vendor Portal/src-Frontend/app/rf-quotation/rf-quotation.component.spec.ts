import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfQuotationComponent } from './rf-quotation.component';

describe('RfQuotationComponent', () => {
  let component: RfQuotationComponent;
  let fixture: ComponentFixture<RfQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
