import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduledInvoiceComponent } from './create-scheduled-invoice.component';

describe('CreateScheduledInvoiceComponent', () => {
  let component: CreateScheduledInvoiceComponent;
  let fixture: ComponentFixture<CreateScheduledInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScheduledInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateScheduledInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
