import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService 
{
  public display = new BehaviorSubject<string>('all');

  constructor() { }

  setDisplayStatus(status : string)
  {
    this.display.next(status);
  }

  getDisplayStatus() : string
  {
    return this.display.value;
  }
}
