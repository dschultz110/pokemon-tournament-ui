import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 20);
    fixture.componentRef.setInput('pageSize', 8);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
