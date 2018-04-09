import { Component, OnInit } from '@angular/core';

import { Report } from '../report';
import { DataReportsService } from '../data-reports.service';

@Component({
  selector: 'al-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reports: Report[];

  constructor(private reportsService: DataReportsService) {
    this.reportsService.reports$.subscribe((reports) => this.reports = reports);
  }

  ngOnInit() {
  }

}
