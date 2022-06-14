import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registermode = false;
  Users:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // this.getusers();
  }


// getusers()
// {
//   this.http.get("https://localhost:5001/api/Users").subscribe(users=> this.Users = users);
// }


registerToggle()
{
  this.registermode = !this.registermode;
}

cancelRegisterMode(event:boolean)
{
this.registermode = event;
}

}
