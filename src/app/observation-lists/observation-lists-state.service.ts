import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservationListsStateService 
{

  // states:
  // list : view sites as a global list
  // details : view details of a given site
  // edit : edit details of a given site
  // create : create a new site
  public state = new BehaviorSubject<string>('list');
  public selectedObsList : any;
  public obsListCreated : boolean = false;
  public obsListModified : boolean = false;

  constructor() { }


  // general site component state
  // ----------------------------
  setState(newState : string)
  {
    this.state.next(newState);
  }

  getState() : string
  {
    return this.state.value;
  }

  // states on Site selection
  // ------------------------

  setSelectedObsList(obsList : any)
  {
    this.selectedObsList = obsList;
  }

  getSelectedObsList(): any
  {
    return this.selectedObsList;
  }



}
