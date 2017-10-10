import { Component, OnInit } from '@angular/core';
import { Query } from "../../core/query.class";
import { UsersService } from "../users.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public queryFilter: Query = new Query({
    where: {
      and: [
        {
          status: {
            inq: ['new', 'in-progress']
          }
        },
        { ssn: '' },
        { dob: '' },
        { id: '' },
        {
          created: {
            between: []
          }
        }
      ]
    },
    limit: 10000,
    skip: 0,
    fields: {},
  });
  
  constructor(public usersService: UsersService) { }

  ngOnInit() {
  }

}
