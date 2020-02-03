import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public isLoggedIn: boolean = false;
  public loggedInUser: User = new User(0, '', '');

  register(id:number, username: string, password: string){
    this.http.post('http://localhost:9999', new User(id, username, password))
    .subscribe((response)=>{
      console.log(`registerd as user ${response}`);
    });
  }

  attemptLogIn(id:number, username: string, password: string) {
    const loggingInAsUser = new User(id ,username, password)
    this.http.post('http://localhost:9999', loggingInAsUser /**new User(username, password)**/)
      .subscribe((response: boolean) => {
        if (response) {
          this.isLoggedIn = true;
          this.loggedInUser = loggingInAsUser;
        } else {
          this.isLoggedIn = false;
          this.loggedInUser = new User(0, "", "");
        }
      });
  }

  logOUt(){
    this.isLoggedIn = false;
    this.loggedInUser = new User(0, '','');
  }

}