import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  // states:
  // list : view items as a global list
  // details : view details of a given item 
  // edit : edit details of a given item
  // create : create a new item
  
  public state = new BehaviorSubject<string>('list');
  public selectedItemIndex = new BehaviorSubject<number>(-1);

  constructor() { }

  setState(newState : string)
  {
    this.state.next(newState);
  }

  getState() : string
  {
    return this.state.value;
  }

  setSelectedItemIndex(index : number)
  {
    this.selectedItemIndex.next(index);
  }

  getSelectedItemIndex(): number
  {
    return this.selectedItemIndex.value;
  }

  resetSelectedItemIndex()
  {
    this.selectedItemIndex.next(-1);
  }
}
