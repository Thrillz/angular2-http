import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = { username: '', password: ''};
  successMessage = '';
  errorMessage = '';

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // login a user method
  login() {
    this.errorMessage = '';
    this.service.login(this.credentials.username, this.credentials.password)
    .subscribe(
      data => {
        this.router.navigate(['/users']);
        console.log(data);
      },
      err => {
        this.errorMessage = err;
        console.log(err);
      }
    );
  }

}
