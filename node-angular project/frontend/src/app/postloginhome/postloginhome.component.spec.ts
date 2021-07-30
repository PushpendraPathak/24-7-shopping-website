import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostloginhomeComponent } from './postloginhome.component';

describe('PostloginhomeComponent', () => {
  let component: PostloginhomeComponent;
  let fixture: ComponentFixture<PostloginhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostloginhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostloginhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
