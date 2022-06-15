import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //  title = 'The First Angular app';
  users:any;
  constructor(private http: HttpClient, private accountService:AccountService){} 

  ngOnInit(){
    // this.getUsers();
   //Observables: Step 8: call the setCurrentUser method 
   this.setCurrentUser();
  }

  //Observables: Step 7: Read the user from local storage and pass it to the setCurrentUser method of the accountservice
  setCurrentUser()
  {
    const user:User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }

// getUsers(){
//   // this.http.get('https://localhost:5001/api/users').subscribe(
//   //   response => { this.users = response;}, 
//   //   error => { console.log(error);} 
//   //   )

//   this.http.get('https://localhost:5001/api/users').subscribe(
//     {
//       next: response => this.users = response,
//       error: error => console.log(error)
//     }
//   )
// }

}


