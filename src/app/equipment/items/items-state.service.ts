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
  public selectedItem : any;
  public itemCreated : boolean = false;
  public itemModified : boolean = false;

  constructor() { }

  // general item component state
  // ----------------------------

  setState(newState : string)
  {
    this.state.next(newState);
  }

  getState() : string
  {
    return this.state.value;
  }

  

  // states on item selection
  // ------------------------

  setSelectedItem(item : any)
  {
    this.selectedItem = item;
  }

  getSelectedItem(): any
  {
    return this.selectedItem;
  }


  // states on editing items
  // -----------------------

  setItemWasCreated()
  {
    this.itemCreated = true;
  }

  setItemWasModified()
  {
    this.itemModified = true;
  }

  resetCreationAndModificationStates()
  {
    this.itemCreated = false;
    this.itemModified = false;
  }

  hasItemDataChanged() : boolean
  {
    return this.itemModified || this.itemCreated;
  }

}
