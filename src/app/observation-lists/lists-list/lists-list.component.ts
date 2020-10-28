import { Component, OnInit } from '@angular/core';
import { ObservationListsStateService } from './../observation-lists-state.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {

  constructor(private obsListState : ObservationListsStateService,              
              private http : HttpClient,
              private _snackBar: MatSnackBar) { }

    // titre du composant
    iconUrl : string = "../../../assets/Icons/general-icons/sites.png";
    title : string = "My sites";
  
    // colonnes du tableau de la liste
    col0 : string = "Name";
    col1 : string = "Observed";
    col2 : string = "Created";

    // valeur de retour de suppression
    private deleteSiteMessage : string = "";

    obsListData : any = [ {name:'Messier', numberObjects:'110', numberObservedObjects:'41', creationDate:'27/10/2020'} ];
    //obsListData : any = [];

  ngOnInit(): void 
  {
    this.fetchSites();
  }

  onSelectedObsList(index : number)
  {
    this.obsListState.setState('details');
    this.obsListState.setSelectedObsList(this.obsListData[index]);
  }

  fetchSites()
  {   
    this.http.get("/observationLists").subscribe(retrievedList => 
      {
        this.obsListData = retrievedList;
        //console.log(this.obsListData);
      }
      );
  }

  deleteObservationList(siteId : number)
  {}

}














