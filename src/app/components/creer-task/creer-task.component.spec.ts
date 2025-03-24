import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTaskComponent } from './creer-task.component';

describe('CreerTaskComponent', () => {
  let component: CreerTaskComponent;
  let fixture: ComponentFixture<CreerTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerTaskComponent]
    });
    fixture = TestBed.createComponent(CreerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
