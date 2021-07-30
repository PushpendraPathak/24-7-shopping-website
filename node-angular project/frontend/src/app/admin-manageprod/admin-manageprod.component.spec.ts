import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageprodComponent } from './admin-manageprod.component';

describe('AdminManageprodComponent', () => {
  let component: AdminManageprodComponent;
  let fixture: ComponentFixture<AdminManageprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
