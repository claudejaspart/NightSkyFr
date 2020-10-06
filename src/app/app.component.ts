import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  // variables
  title = 'Night-Sky.Fr';
  authorized : boolean = true;
  userName : string = "Claude";
  selectedPage : string = "sites";
  

  onAuthorized(authorization:boolean): void
  {
    this.authorized = authorization;
    this.userName = "Claude";
  }

  onPageSelected(page : string):void
  {
    this.selectedPage = page;
  }

}
