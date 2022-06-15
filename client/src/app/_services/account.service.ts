import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

   //Observables: Step 1: Create custom obervable using ReplySubject which is like a buffer to store the values
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}


  //Observables: Step 3: attach a pipe to the post method and store the value in the local storage
  //Note: pipe method helps in transforming the values we get from the observables as we want before it is passed 
  //down to the subscriber

    login(model: any)
    {
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map( (response:User) =>
      {
        const user = response;
        if(user)
        {
        localStorage.setItem("user", JSON.stringify(user));

        //Observables: Step 4: Assign the user we get from API to the custom obervable created
        this.currentUserSource.next(user);
        }
      }
      )
    );
    }


    register(model:any)
    {
      return this.http.post(this.baseUrl + "account/register", model).pipe(
        map( (user:User) => 
        {
          if(user)
          {
            localStorage.setItem("user", JSON.stringify(user));
            this.currentUserSource.next(user);
          }
          // return user;
        })
      );
    }


 //Observables: Step 5: Assign the user we get from API to the custom obervable created in a method
    setCurrentUser(user:User)
    {
      this.currentUserSource.next(user);
    }

    logout()
    {
      localStorage.removeItem("user");
      //Observables: Step 6: Assign null to the custom obervable created while logout
      this.currentUserSource.next(null);
    }
   
}
