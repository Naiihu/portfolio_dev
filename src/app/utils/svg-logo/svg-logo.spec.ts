import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLogo } from './svg-logo';

describe('SvgLogo', () => {
  let component: SvgLogo;
  let fixture: ComponentFixture<SvgLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgLogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgLogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
