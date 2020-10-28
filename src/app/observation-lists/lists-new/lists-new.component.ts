import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObservationListsStateService } from './../observation-lists-state.service';

@Component({
  selector: 'app-lists-new',
  templateUrl: './lists-new.component.html',
  styleUrls: ['./lists-new.component.css']
})
export class ListsNewComponent implements OnInit 
{

    // field names
    name : string = "";
    description : string = "";

    // variables
    isAddingObsList : boolean = false; 
    numberSelectedImages : number = 0;
    selectedFiles : File[] = [];
    totalSelectedFileSize  = 0.0;
    uploadProgress : Number = 0;
    units : string = "";

    constructor(private http : HttpClient, 
                private _snackBar: MatSnackBar, 
                private obsListState : ObservationListsStateService) { }

  ngOnInit(): void 
  {

  }

  // returning to the list of Sites
  onReturn()
  {
    //this.obsListState.setSiteWasCreated();
    this.obsListState.setState('list');
  }

  

  checkValidForm() : boolean
  {
    return this.name.length  ? true : false;
  }


  // APPEL API : AJOUT DU SITE
  onSubmit(form : NgForm)
  {

    if (this.checkValidForm())
    {
      // variable de traSiteent
      this.isAddingObsList = true;

      // envoi de la requete http
      this.http.post( "/addObservationList" , {name : form.value.name, description : form.value.description}, { responseType: 'text', reportProgress: true, observe: 'events' })
                .subscribe( event => 
                {
                    if (event.type === HttpEventType.Response)
                    {
                        if (event.body.includes("SUCCESS"))
                        { 
                            // fin upload - message de succès 
                            this.uploadProgress = 100;   
                            this._snackBar.open('Observation list created !', "Success !", { duration: 1000, horizontalPosition: 'center',panelClass: 'snackbar'});
                          
                            if (this.isAddingObsList === true)
                            {
                              this.isAddingObsList = false;
                              this.onReturn();
                          }                          

                        }
                        else if (event.body.includes("FAIL"))
                        {
                            // fin upload avec message d'erreur
                            this.uploadProgress = 100; 
                            let snackBarRef = this._snackBar.open(event.body, "Error !", { duration: 1000, horizontalPosition:  'center', panelClass: 'snackbar'});  
                            snackBarRef.afterDismissed().subscribe(() => this.isAddingObsList = false); 
                        }
                    }
                });
    }

  }

}
