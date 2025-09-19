import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTemplates } from './multi-templates';

describe('MultiTemplates', () => {
  let component: MultiTemplates;
  let fixture: ComponentFixture<MultiTemplates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiTemplates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiTemplates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
