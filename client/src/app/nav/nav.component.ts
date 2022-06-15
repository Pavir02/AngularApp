import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {}
  // loggedin:boolean;
  // currentUser$: Observable<User>;


  constructor(public accountService:AccountService, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    //Observables: Step 10: Call the getCurrentUser method
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login()
  {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe(
        response=> 
        { 
          this.router.navigateByUrl('/members');
        },
        error=> 
        {
          console.log(error);
          this.toastr.error(error.error);
        }
    );   
  }


//Observables: Step 9: Subscribe to the custom observable currentUser$
// getCurrentUser(){
// this.accountService.currentUser$.subscribe(
//   user => { this.loggedin = !!user },
//   error => {console.log(error)}
// );
// }

logout()
{
    //Observables:  Step 11: Call the accountservice' logout method
    this.accountService.logout();
    this.router.navigateByUrl('/');
    //  this.loggedin=false;
}

}
