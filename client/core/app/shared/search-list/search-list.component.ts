import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { Query } from './../../core/query.class';

@Component({
  selector: 'al-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() public service: any;
  @Input() public queryFilter: Query;

  // Optional
  @Input() public tableData: any[] = [];
  @Input() public limit: number = 10;
  @Input() public sortColumn: string = 'id';
  // Sort order should be 'asc' or 'desc'.
  @Input() public sortReverse: boolean = true;

  public currentPage: number = 1;
  public pages: number[] = [];
  
  public constructor() {
  }

  public ngOnInit(): void {
    this.service.on('sync', (collection, resp, options) => {
      this.resetPagination();
    });   
  }

  public loadData() {
    this.service.fetch(this.queryFilter);
  }

  public isPreviousPage(): boolean {
    return this.currentPage > 1 && this.pages.length > 0;
  }

  public isNextPage(): boolean {
    return this.currentPage < this.pages.length;
  }

  public firstPage() {
    this.currentPage = 1;
    this.refreshtableData();
  }

  public previousPage() {
    this.currentPage -= 1;
    this.refreshtableData();
  }

  public setPage(newPageNumber: number) {
    this.currentPage = newPageNumber;
    this.refreshtableData();
  }

  public nextPage() {
    this.currentPage += 1;
    this.refreshtableData();
  }

  public lastPage() {
    this.currentPage = this.pages.length;
    this.refreshtableData();
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

    this.refreshtableData();
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

  // Creates an array from 1 to the number of pages for pagination.
  // This is necissary because ngFor uses arrays not counts.
  private createPagesArray() {
    this.pages.length = 0;
    let i = 1;
    const pagesLength = Math.ceil(this.service.models.length / this.limit);
    while (i <= pagesLength) {
      this.pages.push(i);
      i += 1;
    }
  }

  // Updates pagination to the new data length.
  private resetPagination() {
    this.currentPage = 1;
    this.createPagesArray();
    this.refreshtableData();
  }

  // Updates the order and pagination
  private refreshtableData() {
    this.tableData = _.chain(this.service.models)
                        .orderBy(this.sortColumn, this.getSortOrder())
                        .slice(this.getOffset(), this.getOffset() + this.limit)
                        .value();
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
