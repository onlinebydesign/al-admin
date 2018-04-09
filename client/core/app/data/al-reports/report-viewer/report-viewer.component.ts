import { ReportData } from './../report-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Report } from '../report';
import { DataReportsService } from '../data-reports.service';
import { Data } from '../../data';
import { DataService } from '../../data.service';

@Component({
  selector: 'al-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {
  public report: Report;
  public data: ReportData[];

  private reportId: string;

  constructor(
    private dataReportsService: DataReportsService,
    private dataService: DataService,
    private flashMessageService: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get the report from the report service if an report id is passed in.
    this.route.params
    .subscribe((params: Params) => {
      this.reportId = params['id'];

      this.loadData();
    });
  }

  private loadData() {
    this.data = [];

    if (this.reportId) {
      this.report = this.dataReportsService.getById(this.reportId);

      this.data = this.dataService.generateReport(this.report);
    }
  }

}
