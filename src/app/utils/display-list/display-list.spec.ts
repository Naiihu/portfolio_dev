import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayList } from './display-list';

describe('DisplayList', () => {
  let component: DisplayList;
  let fixture: ComponentFixture<DisplayList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
