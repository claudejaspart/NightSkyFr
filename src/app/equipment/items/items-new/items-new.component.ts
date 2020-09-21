import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayService } from '../../display.service';
import { ItemsStateService } from '../items-state.service';

@Component({
  selector: 'app-items-new',
  templateUrl: './items-new.component.html',
  styleUrls: ['./items-new.component.css']
})
export class ItemsNewComponent implements OnInit {

  constructor(private http : HttpClient, 
              private _snackBar: MatSnackBar, 
              private displayService : DisplayService,
              private itemsStateService : ItemsStateService) { }


  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  itemsNewFields : any;
  type : string;

  // common variables
  isAddingItem : boolean = false; 
  numberSelectedImages : number = 0;
  selectedFiles : File[] = [];
  totalSelectedFileSize  = 0.0;
  units : string = "";
  uploadProgress : Number = 0;
  creationFinished : boolean = false;

  // telescope variables
  telescopeDiameter : number ;
  telescopeFocal : number ;
  telescopeFDRatio : number;

  // eyepiece variables
  eyepieceFocal : Number;
  eyepieceAFOV : Number;

  // binoculars variables
  binocularsDiameter: Number;
  binocularsMagnification : Number;
  binocularsAFOV : Number;



  ngOnInit(): void 
  {
    this.type = this.displayService.getDisplayStatus();
  }

  // returning to the list of items
  onReturn()
  {
    this.itemsStateService.setState('list');
    this.displayService.setDisplayStatus('all');
  }

  // autocomplétion du rapport f/d
  calculateRatio()
  {
    if (this.telescopeDiameter > 0 && this.telescopeFocal > 0)
    {
      this.telescopeFDRatio = Math.round(10*this.telescopeFocal/this.telescopeDiameter)/10;
    }
  }

  chooseFile(file)
  {
    this.numberSelectedImages = file.length;
    this.totalSelectedFileSize = 0.0;

    for(let i=0; i<file.length;i++)
    {
      this.selectedFiles.push(file[i]);
      this.totalSelectedFileSize += parseFloat(file[i].size);
    }

    // calcul de la taille totale des fichiers
    if (this.totalSelectedFileSize <= 1024)
    {
      this.units = "b";
    }
    else if (this.totalSelectedFileSize > 1024 && this.totalSelectedFileSize <= Math.pow(1024,2) )
    {
      this.units = "Kb";
      this.totalSelectedFileSize = Math.round(100 * this.totalSelectedFileSize / 1024)/100;
    }
    else 
    {
      this.units = "Mb";
      this.totalSelectedFileSize = Math.round(100 * this.totalSelectedFileSize / Math.pow(1024,2))/100;
    }
  }

  onSubmit(form : NgForm)
  {
      // variable de traitement
      this.isAddingItem = true;

      // variable formData
      const fd = new FormData();

      // add core data telescope
      fd.append('name', form.value.name);
      fd.append('aperture', form.value.aperture);
      fd.append('focal', form.value.telescopeFocal);
      fd.append('fdratio', form.value.telescopeFDRatio);
      fd.append('manufacturer', form.value.manufacturer);
      fd.append('description', form.value.description);
      fd.append('author', 'Claude');

      // ajout des images
      this.selectedFiles.forEach( selectedFile => fd.append('image', selectedFile, selectedFile.name));

      // envoi de la requete http
      this.http.post( "/addTelescope" , 
                      fd, 
                      {
                        responseType: 'text',
                        reportProgress: true,
                        observe: 'events'
                      }
                    ).subscribe(
                    event => 
                    {
                      if (event.type === HttpEventType.UploadProgress)
                      {
                        let offset = 1;
                        this.uploadProgress = Math.round(100 * event.loaded / event.total) - offset;
                      }
                      else if (event.type === HttpEventType.Response)
                      {
                        if (event.body === "SUCCESS-TELESCOPE-DB-INS")
                        { 
                          // fin upload
                          this.uploadProgress = 100;  
                          const that = this;  
                          
                          // message de succès
                          let snackBarRef = this._snackBar.open('Telescope created !', "Success !", 
                                            {
                                              duration: 1500,
                                              horizontalPosition:  'center',
                                              panelClass: 'snackbar'                                              
                                            });
                              
                          // actions lorsque la notif se ferme      
                          snackBarRef.afterDismissed().subscribe(null, null, () => 
                          {
                            this.creationFinished = true;                                                                             
                          });

                          if (this.isAddingItem === true)
                          {
                            this.isAddingItem = false;
                            this.onReturn();
                          }                          

                        }
                        else if (event.body === "FAIL-TELESCOPE-DB-INS" || event.body === "FAIL-IMAGE-DB-INS")
                        {
                          // fin upload
                          this.uploadProgress = 100; 

                          // message d'erreur 
                          let snackBarRef = this._snackBar.open('An error occured !', "Error !", 
                          {
                            duration: 1500,
                            horizontalPosition:  'center',
                            panelClass: 'snackbar'                                              
                          });  

                          // actions lorsque la notif se ferme
                          snackBarRef.afterDismissed().subscribe(null, null, () => 
                          {
                            this.isAddingItem = false;
                          }); 

                        }
                      }
                    });
  }


  getNumberSelectedImages()
  {
    if (this.numberSelectedImages === 0)
      return "";
    else
      return `${this.numberSelectedImages} selected - ${this.totalSelectedFileSize} ${this.units}`;
  }


}
