import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'al-table',
    templateUrl: './al-table.component.html',
    styleUrls: ['./al-table.component.scss']
})
export class AlTableComponent implements OnInit, OnDestroy {

    @Input() public actions: any[] = [];
    @Input() public searchColumns: string[] = [];

    // Default options
    @Input() public limit: number = 1000;
    @Input() public sortColumn: string = 'id';
    @Input() public paginationShowPages: number = 7;
    @Input() public sortReverse: boolean = false;

    @Output() public displayedDataChanged = new EventEmitter<any>(); // Event used to send search events to the proper parent.

    public Number = Number;
    public displayedData: any[] = [];
    public filteredData: any[] = [];
    public searchStr: string = '';
    public currentPage: number = 1;
    public pages: number[] = [];
    public visiblePages: number[] = [];
    public selectedCount: number = 0; // Total number of selected items in the list (can span multiple pages).
    public selected: any[] = []; // An array of selected items (not yet implemented - *depending* on desired use of this.selected).
    public bAllSelected: boolean;

    // Used with filterData() to store current filter selections - each Object stores values 
    // in { column = columnName, values = filterValues } format.
    private filterList: Array<any> = [];

    // Set the data and update when data changes.
    private _data: any[] = []; // The original data
    @Input() set data(data: any[]) {
        this._data.length = 0;
        this._data.push(...data);

        this.prepareDisplay(); // Propagate data to display version.
    }

    public ngOnInit(): void {
        if (!this._data) {
            throw new Error('A data array is required');
        }
    }

    public ngOnDestroy(): void {

    }

    public constructor() {
    }

    /**
     * Specify a filter (search or header filter).
     * @param column Column to filter by, if not specified then filter values operates on 'any' column.
     * @param filterValues Array of Search or filter values - if no column is specified, only the first value is used.
     *                     If length is zero, existing filter will be removed.
     */
    public setFilter(column: string, filterValues: string[]) {
        if (!column) {
            this.searchStr = filterValues[0];
        } else {
            const existingItemIndex: number = this.filterList.findIndex(item => (item.column == column));
            if (filterValues.length === 0 && existingItemIndex > -1) {
                this.filterList.splice(existingItemIndex, 1);
            } else if (existingItemIndex > -1) {
                this.filterList[existingItemIndex].values = filterValues;
            } else if (filterValues.length > 0) {
                this.filterList.push({ column: column, values: filterValues });
            }
        }
        this.currentPage = 1; // Any time there is a search, pop back to the beginning of the search results.

        this.prepareDisplay();
    }

    /**
     * Toggle selected state of a search list item.
     * @param aItem Item to toggle as selected.
     * Do not change the selected state of an item directly or the count of the selected items will be incorrect.
     */
    public toggleSelect(aItem: any): void {
        aItem.selected = !aItem.selected; // Toggle the selected state of the item.
        if (aItem.selected) {
            this.selectedCount++;

            // Todo: This should actually push the correct item in the list *depending* on desired use of this.selected.
            this.selected.push('garbage');
        } else {
            this.selectedCount--;
            // Todo: This should actually remove the specific item from the list *depending* on desired use of this.selected.
            this.selected.pop();
        }
    }

    /**
     * Select all of the items on the current pagination page (regardless of current state of selection).
     */
    public selectAll(): void {
        this.selectedCount = 0;
        this.selected.length = 0;

        if (this.bAllSelected) {
            for (const item of this.displayedData) {
                item.selected = false;
            }
            this.bAllSelected = false;
        } else {
            for (const item of this.displayedData) {
                item.selected = true;
                this.selectedCount++
                this.selected.push(item);
            }
            this.bAllSelected = true;
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
        this.prepareDisplay();
    }

    public setLimit(limit) {
        this.limit = parseInt(limit, 10);
        this.prepareDisplay();
    }

    public nextPage() {
        this.setPage(this.currentPage + 1);
    }

    public lastPage() {
        this.setPage(this.pages.length);
    }

    /**
     * Retrieve the filter values from the current collection based on a specified column key.
     * @param column Key corresponding to collection item values for filtering.
     * @returns Array of column filter possibilities.
     */
    public getColumnFilterStrings(column: string): string[] {
        let data: any[] = (this.searchStr) ? this.filterData(this._data, '', [this.searchStr]) : this._data;
        for (const filter of this.filterList) {
            if (filter.column === column) {
                break; // If we've reached the current filter column, show all possible values for that column.
            }
            data = this.filterData(data, filter.column, filter.values); // Filter the data by the filter column/values, up to current.
        }
        return _.chain(data).orderBy(column, 'asc').map(column).uniq().value();
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
        this.prepareDisplay();
    }

    /**
     * Sorts, finds correct data for the current page, then set up the data for the pagination controls.
     */
    public prepareDisplay() {
        // Filter the data by the search string (if no search string, everything matches).
        this.filteredData = (this.searchStr) ? this.filterData(this._data, '', [this.searchStr]) : this._data;

        // Filter the data by the filter column/values.
        for (const filter of this.filterList) {
            this.filteredData = this.filterData(this.filteredData, filter.column, filter.values);
        }

        this.displayedData = _.chain(this.filteredData)
            .orderBy(this.sortColumn, this.getSortOrder())
            .slice(this.getOffset(), this.getOffset() + this.limit)
            .value();

        this.createPagination();
        this.displayedDataChanged.emit(this.displayedData);
    }

    /**
     * Specify pagination controls - which page we're on, and allow selection of a page based on pagination data.
     */
    private createPagination() {
        // Creates an array from 1 to the number of pages for pagination.
        // This is necessary because ngFor uses arrays not counts.
        this.pages.length = 0;
        const pagesLength = Math.ceil(this.filteredData.length / this.limit);
        for (let i = 1; i <= pagesLength; i++) {
            this.pages.push(i);
        }

        // Create the subset of visible pages.
        const start = Math.max(this.currentPage - Math.ceil(this.paginationShowPages / 2), 0);
        const end = start + this.paginationShowPages;

        this.visiblePages = this.pages.slice(start, end);
    }

    /**
     * Filter source data by specified column(s) and filter(s).
     * @param source The array of original data.
     * @param column The column to filter by (uses all available searchable columns if blank).
     * @param filters The filters to use in filtering the data.
     * @returns Filtered array of data.
     */
    private filterData(source: any[], column: string, filters: string[]): any[] {
        const result: any[] = [];
        let columns = [];

        let filter = filters.join('|');
        if (column === '') { // Check any available search column for a match.
            columns = this.searchColumns;
        } else { // Check that column for any values in the filters.
            columns.push(column);
            filter = '\\b' + filters.join('\\b|\\b') + '\\b';
        }

        // Create the regex matching term once (case-insensitive, doing an 'OR' search on all filter items).
        const searchRegex = new RegExp(filter, 'i');
        for (let columnIndex = 0; columnIndex < source.length; columnIndex++) {
            const item = source[columnIndex]; // Compare the next item
            for (let propIndex = 0; propIndex < columns.length; propIndex++) {
                // Compare the next item property value.
                const next: string = String(_.get(item, columns[propIndex]));
                if (next.match(searchRegex)) {
                    // Found one that matches, put it in the results.
                    result.push(item);
                    break;
                }
            }
        }

        return result;
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
