import { Component, computed, input, output } from '@angular/core';

import { PAGE_SIZE_OPTIONS } from '../../models/pagination.constants';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  pageSize = input.required<number>();

  pageChange = output<number>();
  pageSizeChange = output<number>();

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }
    this.pageChange.emit(page);
  }

  previous(): void {
    this.goToPage(this.currentPage() - 1);
  }

  next(): void {
    this.goToPage(this.currentPage() + 1);
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(pageSize);
  }
}
