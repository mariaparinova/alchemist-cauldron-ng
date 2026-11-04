import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lives } from './lives';

describe('Lives', () => {
  let component: Lives;
  let fixture: ComponentFixture<Lives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lives],
    }).compileComponents();

    fixture = TestBed.createComponent(Lives);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
