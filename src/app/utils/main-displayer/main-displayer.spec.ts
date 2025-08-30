import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDisplayer } from './main-displayer';

describe('MainDisplayer', () => {
  let component: MainDisplayer;
  let fixture: ComponentFixture<MainDisplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDisplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDisplayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
