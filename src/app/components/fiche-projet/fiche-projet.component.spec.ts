import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheProjetComponent } from './fiche-projet.component';

describe('FicheProjetComponent', () => {
  let component: FicheProjetComponent;
  let fixture: ComponentFixture<FicheProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheProjetComponent]
    });
    fixture = TestBed.createComponent(FicheProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
