import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteStateService 
{

  // states:
  // list : view sites as a global list
  // details : view details of a given site
  // edit : edit details of a given site
  // create : create a new site
  public state = new BehaviorSubject<string>('list');
  public selectedSite : any;
  public siteCreated : boolean = false;
  public siteModified : boolean = false;

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

  

  // states on item selection
  // ------------------------

  setSelectedSite(site : any)
  {
    this.selectedSite = site;
  }

  getSelectedItem(): any
  {
    return this.selectedSite;
  }


  // states on editing items
  // -----------------------

  setItemWasCreated()
  {
    this.siteCreated = true;
  }

  setItemWasModified()
  {
    this.siteModified = true;
  }

  resetCreationAndModificationStates()
  {
    this.siteCreated = false;
    this.siteModified = false;
  }

  hasItemDataChanged() : boolean
  {
    return this.siteModified || this.siteCreated;
  }


}
