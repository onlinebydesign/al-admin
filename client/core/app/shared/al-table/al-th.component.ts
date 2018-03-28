import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: '[th-sortable]',
    templateUrl: './al-th.component.html',
    styleUrls: ['./al-th.component.scss']
})
export class AlThComponent implements OnInit {
    @Input() public table;
    @Input() public prop;
    @Input() public filter: boolean = false;

    public selectedItems: string[] = [];

    constructor() { }

    ngOnInit() {
    }

    /**
     * Retrieve the filter values from the current collection based on a specified column key.
     * @returns Array of column filter possibilities.
     */
    public getFilterStrings(): string[] {
        return this.table.getColumnFilterStrings(this.prop);
    }

    /**
     * Select all available items in the current filter.
     */
    public selectAll() {
        this.selectedItems = []; // Reset selected items to "select everything."
        this.setFilter(); // Update the display.
    }

    /**
     * Specify a filter (search or header filter).
     */
    public setFilter() {
        return this.table.setFilter(this.prop, this.selectedItems);
    }
}
