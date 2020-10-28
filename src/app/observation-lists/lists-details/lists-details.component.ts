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

    // statut de filtrage par colonne
    isNameAsc : boolean = false;
    isTypeAsc : boolean = false;
    isMagnAsc : boolean = false;
    isObsAsc : boolean = false;


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
          this.sortTable('name');
          //console.log(this.obsListDataDetails);
        });
    }
  
    deleteObservationList(siteId : number)
    {}

    onReturn()
    {
      this.obsListState.setState('list');
    }

    sortTable(fieldName)
    {
      console.log("sorting : " + fieldName);

      // triage par nom
      if (fieldName === 'name')
      {
        if (!this.isNameAsc)
        {
          this.isNameAsc = true;
          this.obsListDataDetails.sort( (a,b)=> { return parseInt(a.name.substring(1)) > parseInt(b.name.substring(1))});
        }
        else
        {
          this.isNameAsc = false;
          this.obsListDataDetails.sort( (a,b)=> { return parseInt(a.name.substring(1)) < parseInt(b.name.substring(1))});
        }
      }

      // triage par type
      if (fieldName === 'type')
      {
        if (!this.isTypeAsc)
        {
          this.isTypeAsc = true;
          this.obsListDataDetails.sort( (a,b) => { return a.type > b.type });
        }
        else
        {
          this.isTypeAsc = false;
          this.obsListDataDetails.sort( (a,b) => { return a.type < b.type });
        }
      }

      // triage par type
      if (fieldName === 'magnitude')
      {
        if (!this.isMagnAsc)
        {
          this.isMagnAsc = true;
          this.obsListDataDetails.sort( (a,b) => { return parseFloat(a.magnitude) >  parseFloat(b.magnitude) });
        }
        else
        {
          this.isMagnAsc = false;
          this.obsListDataDetails.sort( (a,b) => { return  parseFloat(a.magnitude) <  parseFloat(b.magnitude) });
        }
      }
      
      // triage par nombre d'observation
      if (fieldName === 'observed')
      {
        if (!this.isObsAsc)
        {
          this.isObsAsc = true;
          this.obsListDataDetails.sort( (a,b) => { return parseInt(a.number_observations) >  parseInt(b.number_observations) });
        }
        else
        {
          this.isObsAsc = false;
          this.obsListDataDetails.sort( (a,b) => { return  parseInt(a.number_observations) <  parseInt(b.number_observations) });
        }
      }


    }



}
