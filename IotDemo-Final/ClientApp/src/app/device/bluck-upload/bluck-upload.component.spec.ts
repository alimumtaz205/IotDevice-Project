import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluckUploadComponent } from './bluck-upload.component';

describe('BluckUploadComponent', () => {
  let component: BluckUploadComponent;
  let fixture: ComponentFixture<BluckUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluckUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluckUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
