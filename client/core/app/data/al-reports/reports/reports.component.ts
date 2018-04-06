import { DataReport } from './../data-report';
import { Component, OnInit } from '@angular/core';
import { DataReportsService } from '../data-reports.service';

@Component({
  selector: 'al-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reports: DataReport[];

  constructor(private reportsService: DataReportsService) {
    this.reportsService.reports$.subscribe((reports) => this.reports = reports);
  }

  ngOnInit() {
  }

}
