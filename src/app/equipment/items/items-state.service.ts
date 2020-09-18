import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  // states:
  // list : view items as a global list
  // view : view details of a given item 
  // edit : edit details of a given item
  // create : create a new item
  
  public state = new BehaviorSubject<string>('list');

  constructor() { }

  setState(newState : string)
  {
    this.state.next(newState);
  }

  getState() : string
  {
    return this.state.value;
  }
}
