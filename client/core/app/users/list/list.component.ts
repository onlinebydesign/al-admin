import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { LoopbackQuery } from '../../core/query.class';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-list',
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
  public users: User[] = [];
  public displayedUsers: User[] = [];
  public selected: User;
  public searchColumns = [
    'firstName',
    'lastName',
    'email',
    'emailVerified',
    'role'
  ];

  private modalRef: BsModalRef;

  constructor(private usersService: UsersService, private modalService: BsModalService) {
    this.usersService.users$.subscribe((users: User[]) => {
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

  public updateDisplayed(users: User[]) {
    this.displayedUsers.length = 0;
    this.displayedUsers.push(...users);
  }

  public add(email: string, password: string) {
    this.usersService.add(email, password).subscribe(user => {
      this.selected = user;
      this.modalRef.hide();
    });
  }

  public save(user: User) {
    this.usersService.save(user).subscribe(() => this.removeSelection());
  }

  public delete(user: User) {
    this.usersService.delete(user).subscribe(() => this.removeSelection());
  }

  public removeSelection() {
    setTimeout(() => delete this.selected);
  }

  cancel(): void {
    this.modalRef.hide();
  }

}
