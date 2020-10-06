import { Component, OnInit } from '@angular/core';
import { SiteStateService } from './site-state.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit 
{

  currentSiteState : string = "list";

  constructor(private siteState : SiteStateService) { }

  ngOnInit(): void 
  {
    this.siteState.setState('list');    // récupération de la liste
  }

  ngDoCheck(): void
  {
    this.currentSiteState = this.siteState.getState();
  }

  createItem(type : string)
  {
    this.siteState.setState('create');
  }
}
