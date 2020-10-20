import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SiteStateService } from '../site-state.service';

@Component({
  selector: 'app-sites-new',
  templateUrl: './sites-new.component.html',
  styleUrls: ['./sites-new.component.css']
})
export class SitesNewComponent implements OnInit 
{
    // field names
    name : string = "";
    address : string = "";
    postalcode : string = "";
    city : string = "";
    country : string = "";
    latitude : string = "";
    longitude : string = "";
    elevation : number ;
    description : string = "";

    // variables
    isAddingSite : boolean = false; 
    numberSelectedImages : number = 0;
    selectedFiles : File[] = [];
    totalSelectedFileSize  = 0.0;
    uploadProgress : Number = 0;
    units : string = "";

    constructor(private http : HttpClient, 
      private _snackBar: MatSnackBar, 
      private siteStateService : SiteStateService) { }

  ngOnInit(): void 
  {

  }

  // returning to the list of Sites
  onReturn()
  {
    this.siteStateService.setSiteWasCreated();
    this.siteStateService.setState('list');
    //this.displayService.setDisplayStatus('all');
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

  getNumberSelectedImages()
  {
    if (this.numberSelectedImages === 0)
      return "";
    else
      return `${this.numberSelectedImages} selected - ${this.totalSelectedFileSize} ${this.units}`;
  }

  checkValidForm() : boolean
  {
    return this.name.length && this.latitude && this.longitude && this.elevation  ? true : false;
  }


  // APPEL API : AJOUT DU SITE
  onSubmit(form : NgForm)
  {

    if (this.checkValidForm())
    {
      // variable de traSiteent
      this.isAddingSite = true;

          // variable formData
      const fd = new FormData();

      // add core data telescope
      fd.append('name', form.value.name);
      fd.append('address', form.value.address);
      fd.append('postalcode', form.value.postalcode);
      fd.append('city', form.value.city);
      fd.append('country', form.value.country);
      fd.append('latitude', form.value.latitude);
      fd.append('longitude', form.value.longitude);
      fd.append('elevation', form.value.elevation);
      fd.append('description', form.value.description);

      console.log(form.value.postalcode)


      // ajout des images
      this.selectedFiles.forEach( selectedFile => fd.append('image', selectedFile, selectedFile.name));

      // envoi de la requete http
      this.http.post( "/addSite" , fd, { responseType: 'text', reportProgress: true, observe: 'events' })
               .subscribe( event => 
                {
                    if (event.type === HttpEventType.UploadProgress)
                    {
                        let offset = 1;
                        this.uploadProgress = Math.round(100 * event.loaded / event.total) - offset;
                    }
                    else if (event.type === HttpEventType.Response)
                    {
                        if (event.body.includes("SUCCESS"))
                        { 
                            // fin upload - message de succès 
                            this.uploadProgress = 100;   
                            this._snackBar.open(' Site created !', "Success !", { duration: 1000, horizontalPosition: 'center',panelClass: 'snackbar'});
                          
                            if (this.isAddingSite === true)
                            {
                              this.isAddingSite = false;
                              this.onReturn();
                          }                          

                        }
                        else if (event.body.includes("FAIL"))
                        {
                            // fin upload avec message d'erreur
                            this.uploadProgress = 100; 
                            let snackBarRef = this._snackBar.open(event.body, "Error !", { duration: 1000, horizontalPosition:  'center', panelClass: 'snackbar'});  
                            snackBarRef.afterDismissed().subscribe(() => this.isAddingSite = false); 
                        }
                    }
                });
    }

  }

}
