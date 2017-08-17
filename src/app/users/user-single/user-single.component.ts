import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService} from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: 'user-single.component.html'
})
export class UserSingleComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) {  }

  ngOnInit() {
    // grab the id from the url using the router
    let id = this.route.snapshot.params["id"];

    //get the user using the getUser method from userService
    this.service.getUser(id).subscribe(user => this.user = user);
  }

  // delete a user
  deleteUser() {
    this.service.deleteUser(this.user.id).subscribe(data => {
      console.log("User was deleted");
      // route back to the users page
      this.router.navigate(['/users']);
    });
  }
}
