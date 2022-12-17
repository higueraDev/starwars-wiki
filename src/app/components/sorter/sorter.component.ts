import { Component, EventEmitter, Output } from '@angular/core';
import { SortOptions } from 'src/app/models/enums/sort-options';
import { InterfaceFactoryService } from 'src/app/services/interface-factory.service';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss'],
})
export class SorterComponent {
  public isAsc: boolean = true;
  public sort: SortOptions = SortOptions.EPISODE;
  public sortOptions: SortOptions[] = [];

  @Output() sortChanged = new EventEmitter<{ sort: string; isAsc: boolean }>();

  constructor() {
    const interfaceFactoryService: InterfaceFactoryService =
      new InterfaceFactoryService();
    this.sortOptions = interfaceFactoryService.createArray(SortOptions);
  }

  onOrderChange() {
    this.toogleOrder();
    this.onSortChange();
  }

  onSortChange() {
    this.sortChanged.emit({ sort: this.sort, isAsc: this.isAsc });
  }

  toogleOrder() {
    this.isAsc = !this.isAsc;
  }
}