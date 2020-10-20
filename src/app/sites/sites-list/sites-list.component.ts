import { Component, OnInit } from '@angular/core';
import { SiteStateService } from './../site-state.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit {

  constructor(  private siteState : SiteStateService,              
                private http : HttpClient,
                private _snackBar: MatSnackBar ) { }

    // titre du composant
    iconUrl : string = "../../../assets/Icons/general-icons/sites.png";
    title : string = "My sites";
  
    // colonnes du tableau de la liste
    col0 : string = "Name";
    col1 : string = "City";
    col2 : string = "Country";
    col3 : string = "Longitude";

    sitesData: any = 
    [
      {name:'Home', city:'Venelles, Fr', latitude:'46N', longitude:'52W'}
    ];

    // valeur de retour de suppression
    private deleteSiteMessage : string = "";

  ngOnInit(): void 
  {
    this.fetchSites();
  }

  onSelectedSite(index : number)
  {
    this.siteState.setState('details');
    this.siteState.setSelectedSite(this.sitesData[index]);
  }

  fetchSites()
  {   
    this.http.get("/sites").subscribe(retrievedList => this.sitesData = retrievedList);
  }

  deleteSite(siteId : number)
  {
    // delete message
    let snackBarRef = this._snackBar.open("Delete site ?", "Yes !", { duration: 2000, horizontalPosition:  'center'});  
    snackBarRef.onAction().subscribe(() => 
    {
      let url = `/DeleteSite?siteId=${siteId}`;
      this.http.delete(url,{responseType: 'text'}).subscribe(deleteResult => 
      {
        this.deleteSiteMessage = deleteResult;
        snackBarRef.dismiss();

        if (this.deleteSiteMessage.includes('SUCCESS'))
        {
          // message de succès
          this._snackBar.open("Site deleted !", "Success !", { duration: 1000, horizontalPosition:  'center'});  
          this.fetchSites();
        }
        else
        {
          // message d'erreur
          this._snackBar.open("An error occured", this.deleteSiteMessage, { duration: 1000, horizontalPosition:  'center'});  
        }

      });
    });
  }

}
