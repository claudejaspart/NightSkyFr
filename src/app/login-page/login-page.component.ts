import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  @Output() authorizedUser : EventEmitter<boolean> = new EventEmitter<boolean>();
  badCredentials : boolean = false;

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) 
  {
    let email = f.value.email;
    let password = f.value.password;

    if (email === "claude" && password == "admin")
    {
      this.authorizedUser.emit(true);
    }
    else
    {
      this.authorizedUser.emit(false);
      this.badCredentials=true;
     
      this.delay(1500).then(any=>
      {
        this.badCredentials=false;
        f.reset();
      })
    }

    //console.log(f.value.password) ;  
    //console.log(f.valid);  // false
  }

  async delay(ms: number) 
  {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

}
