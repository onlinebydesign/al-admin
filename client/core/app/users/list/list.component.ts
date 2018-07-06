import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { LoopbackQuery, AlUser } from 'al-core';

import { UsersService } from '../users.service';

@Component({
  selector: 'al-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public queryFilter: LoopbackQuery = new LoopbackQuery({
    where: {},
    limit: 10000,
    skip: 0,
    fields: {},
  });
  public users: AlUser[] = [];
  public displayedUsers: AlUser[] = [];
  public selected: AlUser;
  public searchColumns = [
    'firstName',
    'lastName',
    'email',
    'emailVerified',
    'role'
  ];

  private modalRef: BsModalRef;

  constructor(private usersService: UsersService, private modalService: BsModalService) {
    this.usersService.users$.subscribe((users: AlUser[]) => {
      this.users = [];
      setTimeout(() => this.users = users);
    });
  }

  public ngOnInit() {
    this.usersService.fetch();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public updateDisplayed(users: AlUser[]) {
    this.displayedUsers.length = 0;
    this.displayedUsers.push(...users);
  }

  public add(email: string, password: string) {
    this.usersService.add(email, password).subscribe(user => {
      this.selected = user;
      this.modalRef.hide();
    });
  }

  public save(user: AlUser) {
    this.usersService.save(user).subscribe(() => this.removeSelection());
  }

  public delete(user: AlUser) {
    this.usersService.delete(user).subscribe(() => this.removeSelection());
  }

  public removeSelection() {
    setTimeout(() => delete this.selected);
  }

  cancel(): void {
    this.modalRef.hide();
  }

}
