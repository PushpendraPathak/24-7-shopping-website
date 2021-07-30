import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditprodComponent } from './admin-editprod.component';

describe('AdminEditprodComponent', () => {
  let component: AdminEditprodComponent;
  let fixture: ComponentFixture<AdminEditprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
