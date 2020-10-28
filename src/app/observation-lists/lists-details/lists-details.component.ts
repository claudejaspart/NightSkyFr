import { Component, OnInit } from '@angular/core';
import { ObservationListsStateService } from './../observation-lists-state.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lists-details',
  templateUrl: './lists-details.component.html',
  styleUrls: ['./lists-details.component.css']
})
export class ListsDetailsComponent implements OnInit {

  constructor(private obsListState : ObservationListsStateService,              
              private http : HttpClient,
              private _snackBar: MatSnackBar) { }

    // titre du composant
    iconUrl : string = "../../../assets/Icons/general-icons/sites.png";
    title : string = "";
  
    // colonnes du tableau de la liste
    col0 : string = "Name";
    col1 : string = "Type";
    col2 : string = "Magn.";
    col3 : string = "#Obs";


    // valeur de retour de suppression
    private deleteSiteMessage : string = "";

    //obsListDataDetails : any = [ {name:'M13', type:'galaxy', magnitude:'4.1', number_observations:'5'} ];
    obsListDataDetails : any = [];

    ngOnInit(): void 
    {
      this.fetchObservationListData();
    }
  
    onSelectedObsList(index : number)
    {
      this.obsListState.setState('details');
      this.obsListState.setSelectedObsList(this.obsListDataDetails[index]);
    }
  
    fetchObservationListData()
    {   
      let obsListId = this.obsListState.getSelectedObsList().id;
  
    
      this.http.get(`/observationListsDetails?id=${obsListId}`).subscribe(retrievedList => 
        {
          this.obsListDataDetails = retrievedList;
          console.log(this.obsListDataDetails);
        });
    }
  
    deleteObservationList(siteId : number)
    {}

    onReturn()
    {
      this.obsListState.setState('list');
    }

}
