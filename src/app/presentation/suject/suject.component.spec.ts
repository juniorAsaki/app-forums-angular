import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujectComponent } from './suject.component';

describe('SujectComponent', () => {
  let component: SujectComponent;
  let fixture: ComponentFixture<SujectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SujectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SujectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
