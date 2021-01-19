import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDatailsComponent } from './feed-datails.component';

describe('FeedDatailsComponent', () => {
  let component: FeedDatailsComponent;
  let fixture: ComponentFixture<FeedDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedDatailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
