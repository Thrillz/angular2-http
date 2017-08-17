import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = {name: '', username: '', avatar: ''};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    this.successMessage = '';
    this.errorMessage = '';

    this.service.createUser(this.user)
    .subscribe(user => {
      this.successMessage = "User was created";
      console.log(user);
      
      this.router.navigate(["/users"]);

    })
  }

}
