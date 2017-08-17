import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService) {  }

  ngOnInit() {
    // user has been created
    this.service.userCreated$.subscribe(user => {
      this.successMessage = `${user.name} has been created`;
      this.clearMessages();
    });

    //user has been deleted
    this.service.userDeleted$.subscribe(() => {
      this.errorMessage = `the user has been deleted`;
      this.clearMessages();
    });
  }

  // clear alert messages(succes and error) after 5 seconds
  clearMessages() {
    setTimeout(() =>{
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);
  }
}
