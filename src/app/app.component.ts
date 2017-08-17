import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { User } from './shared/models/user';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  message = "This is a sample message.";

  users: User[];

  constructor (private userService: UserService,private authService: AuthService, private router: Router) {}

  ngOnInit () {

    // subscribing to users from the user service
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  // log the user out
  logout() {
    console.log("haha");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
