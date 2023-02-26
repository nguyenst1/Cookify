import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRecipesComponent } from './daily-recipes.component';

describe('DailyRecipesComponent', () => {
  let component: DailyRecipesComponent;
  let fixture: ComponentFixture<DailyRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
