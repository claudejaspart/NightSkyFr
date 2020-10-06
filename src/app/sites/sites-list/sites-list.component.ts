import { Component, OnInit } from '@angular/core';
import { SiteStateService } from './../site-state.service';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit {

  constructor(private siteState : SiteStateService) { }

    // titre du composant
    iconUrl : string = "../../../assets/Icons/general-icons/sites.png";
    title : string = "My sites";
  
    // colonnes du tableau de la liste
    col0 : string = "Name";
    col1 : string = "City";
    col2 : string = "Latitude";
    col3 : string = "Longitude";

    sitesData: any = 
    [
      {name:'Home', city:'Venelles, Fr', latitude:'46N', longitude:'52W'}
    ];

    // valeur de retour de suppression
    private deleteItemMessage : string = "";

  ngOnInit(): void 
  {

  }

  onSelectedItem(index : number)
  {
    this.siteState.setState('details');
    this.siteState.setSelectedSite(this.sitesData[index]);
  }

}
