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
  readonly  NONE_SELECTED : number = -1;
  public state = new BehaviorSubject<string>('list');
  public selectedItemIndex = new BehaviorSubject<number>(this.NONE_SELECTED);
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
    this.selectedItemIndex.next(this.NONE_SELECTED);
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
