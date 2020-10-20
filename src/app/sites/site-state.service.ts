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
  public sSiteodified : boolean = false;

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

  setSelectedSite(site : any)
  {
    this.selectedSite = site;
  }

  getSelectedSite(): any
  {
    return this.selectedSite;
  }


  // states on editing Sites
  // -----------------------

  setSiteWasCreated()
  {
    this.siteCreated = true;
  }

  setSiteWasModified()
  {
    this.sSiteodified = true;
  }

  resetCreationAndModificationStates()
  {
    this.siteCreated = false;
    this.sSiteodified = false;
  }

  hasSiteDataChanged() : boolean
  {
    return this.sSiteodified || this.siteCreated;
  }


}
