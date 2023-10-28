import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawFormComponent } from './raw-form.component';

describe('RawFormComponent', () => {
  let component: RawFormComponent;
  let fixture: ComponentFixture<RawFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawFormComponent]
    });
    fixture = TestBed.createComponent(RawFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
