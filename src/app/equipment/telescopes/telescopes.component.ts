import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TelescopeDataService } from '../../telescope-data.service';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.css']
})
export class TelescopesComponent implements OnInit {

  constructor(private detailsService : TelescopeDataService,
              private http : HttpClient,
              private _snackBar: MatSnackBar) {}

  currentSelection : string = "equipment";

  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  @Input() telescopes;
  deletedTelescope : boolean = false;
  

  ngOnInit(): void 
  {
    
  }



  onAddTelescope() 
  {
    this.navigationPanel.emit('telescope-add');
  }   

  onSelectTelescope(index: number)
  {
    console.log("from telescope list : " + index);
    this.detailsService.addData(this.telescopes[index]);
    this.navigationPanel.emit('telescope-details');
  }

  onDeleteTelescope(telescopeId : number)
  {
    this.http.delete(`/delTelescopes/${telescopeId}`,{responseType: 'text'}).subscribe(
      (data) => 
      {
        if (data === "SUCCESS-TELESCOPE-DB-DELETE")
        {
          // message de succès
          let snackBarRef = this._snackBar.open('Telescope deleted !', "Success !", 
          {
            duration: 1500,
            horizontalPosition:  'center',
            panelClass: 'snackbar'                                              
          });
          // actions lorsque la notif se ferme
          snackBarRef.afterDismissed().subscribe(null, null, () => 
          {
            this.deletedTelescope = true;
          });

          // refresh the list
          if (this.deletedTelescope)
          {
            this.deletedTelescope = false;
            console.log(this.telescopes);
            //this.navigationPanel.emit();            
          }

        }
        else
        {
          // show success snackbar
        }
      });
      
  }

}

