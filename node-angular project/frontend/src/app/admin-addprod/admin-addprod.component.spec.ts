import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddprodComponent } from './admin-addprod.component';

describe('AdminAddprodComponent', () => {
  let component: AdminAddprodComponent;
  let fixture: ComponentFixture<AdminAddprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
