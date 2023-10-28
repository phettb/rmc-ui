import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMatComponent } from './raw-mat.component';

describe('RawMatComponent', () => {
  let component: RawMatComponent;
  let fixture: ComponentFixture<RawMatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawMatComponent]
    });
    fixture = TestBed.createComponent(RawMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
