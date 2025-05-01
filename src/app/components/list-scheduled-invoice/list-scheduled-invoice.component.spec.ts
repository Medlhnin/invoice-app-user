import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduledInvoiceComponent } from './list-scheduled-invoice.component';

describe('ListScheduledInvoiceComponent', () => {
  let component: ListScheduledInvoiceComponent;
  let fixture: ComponentFixture<ListScheduledInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListScheduledInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListScheduledInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
