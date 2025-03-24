import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTaskComponent } from './fiche-task.component';

describe('FicheTaskComponent', () => {
  let component: FicheTaskComponent;
  let fixture: ComponentFixture<FicheTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheTaskComponent]
    });
    fixture = TestBed.createComponent(FicheTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
