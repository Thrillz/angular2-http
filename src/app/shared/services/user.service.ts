
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class UserService {

  private usersUrl: string = 'https://reqres.in/api/users';

  // Observable source
  private userCreatedSource = new Subject<User> ();
  private userDeletedSource = new Subject ();

  // Observable stream
  userCreated$ = this.userCreatedSource.asObservable();
  userDeleted$ = this.userDeletedSource.asObservable();

  constructor( private http: Http ) {  }

  // grab all users
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
    .map(res => res.json().data)
    .map(users => {
      //reformat to match our user class
      return users.map(user => this.toUser(user));
    })
    .catch(this.handleError);
  }

  //get a single user
  getUser(id: number): Observable<User> {

    // attaching a token
    let headers = new Headers();
    let token = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.usersUrl}/${id}`, {headers})
    .map(res => res.json().data)
    .map(this.toUser)
    .catch(this.handleError);
  }

  //create a user
  createUser(user: User): Observable<User> {
    return this.http.post(this.usersUrl, user)
    .map(res => res.json())
    .do(user => this.userCreated(user))
    .catch(this.handleError);
  }

  //update a user
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
    .map(res => res.json())
    .catch(this.handleError);
  }

  //delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`)
    .do(res => this.userDeleted())
    .catch(this.handleError);
  }

  //the user was created, add this info to out=r stream
  userCreated(user: User) {
    this.userCreatedSource.next(user);
  }

  //the user was delete, add info to stream
  userDeleted() {
    this.userDeletedSource.next();
  }

  //handle any errors from the api
  private handleError(err) {

    let errMessage: string;

    if (err instanceof Response) {
      let body = err.json() || "";
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);

  }

  // user method
  private toUser(user) {
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      username: user.first_name,
      avatar: user.avatar
    };
  }
}
