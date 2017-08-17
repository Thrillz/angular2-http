import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private service: UserService) {  }

  ngOnInit() {
    this.service.getUsers()
    .subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }
}
