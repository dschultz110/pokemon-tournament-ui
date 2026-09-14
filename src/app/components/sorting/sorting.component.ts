import { Component, output, signal } from '@angular/core';

import { SortDirection, SortField } from '../../models/sort.model';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent {
  sortByChange = output<SortField>();
  directionChange = output<SortDirection>();

  sortBy = signal<SortField>('wins');
  direction = signal<SortDirection>('desc');

  onSortByChange(event: Event): void {
    const field = (event.target as HTMLSelectElement).value as SortField;
    this.sortBy.set(field);
    this.sortByChange.emit(field);
  }

  onDirectionChange(event: Event): void {
    const direction = (event.target as HTMLSelectElement).value as SortDirection;
    this.direction.set(direction);
    this.directionChange.emit(direction);
  }
}
