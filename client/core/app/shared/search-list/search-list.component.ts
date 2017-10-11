import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Collection from 'ampersand-rest-collection';
import * as _ from 'lodash';

@Component({
  selector: 'al-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() public serviceObservable: Observable<any[]>;
  @Input() public rowCount: number;
  @Input() public tableData: any[] = [];
  @Input() public limit: number = 10;
  @Input() public sortColumn: string = 'id';
  @Input() public sortReverse: boolean = true;

  @Output() public updateParameters = new EventEmitter<any>();

  public currentPage: number = 1;
  public pages: number[] = [];

  private data: any[] = [];

  public constructor() {
  }

  public ngOnInit(): void {
    if (this.serviceObservable) {
      this.serviceObservable.subscribe((data) => {
        this.data = data;
        this.reset();
      });
    }
  }

  public isPreviousPage(): boolean {
    return this.currentPage > 1 && this.pages.length > 0;
  }

  public isNextPage(): boolean {
    return this.currentPage < this.pages.length;
  }

  public firstPage() {
    this.setPage(1);
  }

  public previousPage() {
    this.setPage(this.currentPage - 1);
  }

  public setPage(newPageNumber: number) {
    this.currentPage = newPageNumber;
    this.refresh();
  }

  public nextPage() {
    this.setPage(this.currentPage + 1);
  }

  public lastPage() {
    this.setPage(this.pages.length);
  }

  // Change sort and update table data.
  public toggleSort(column: string, reverse?: boolean) {
    // If order is not set we will default to 'asc' if a different 
    // column was selected and 'desc' if the same column was selected
    // but was set to 'asc'
    if (!reverse && reverse !== false) {
      if (this.sortColumn === column && !this.sortReverse) {
        this.sortReverse = true;
      } else {
        this.sortReverse = false;
      }
    } else {
      this.sortReverse = reverse;
    }

    // Set sort column before ending
    this.sortColumn = column;

    this.refresh();
  }

  // These classes are for indicating the sort order and column in the table.
  public getSortIconClasses(column: string): string {
    if (this.sortColumn === column) {
      if (this.sortReverse) {
        return 'fa fa-sort-amount-asc pull-right';
      }
      return 'fa fa-sort-amount-desc pull-right';
    }
    return '';
  }

  private getRowCount() {
    return this.rowCount || this.data.length;
  }
  // Creates an array from 1 to the number of pages for pagination.
  // This is necissary because ngFor uses arrays not counts.
  private createPagesArray() {
    this.pages.length = 0;
    let i = 1;
    const pagesLength = Math.ceil(this.getRowCount() / this.limit);
    while (i <= pagesLength) {
      this.pages.push(i);
      i += 1;
    }
  }

  // Updates pagination to the new data length.
  private reset() {
    this.currentPage = 1;
    this.createPagesArray();
    this.refresh();
  }

  // Updates the order and pagination
  private refresh() {
    if (this.rowCount) {
      this.updateParameters.emit({
        limit: this.limit,
        order: this.sortColumn + ' ' + this.getSortOrder(),
        skip: this.getOffset()
      });
    } else {
      this.tableData = _.chain(this.data)
      .orderBy(this.sortColumn, this.getSortOrder())
      .slice(this.getOffset(), this.getOffset() + this.limit)
      .value();
    }
  }

  private getOffset(): number {
    return (this.currentPage - 1) * this.limit;
  }

  private getSortOrder(): string {
    if (this.sortReverse) {
      return 'desc';
    }

    return 'asc';
  }
}
