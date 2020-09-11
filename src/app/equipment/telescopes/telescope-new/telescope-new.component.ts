import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-telescope-new',
  templateUrl: './telescope-new.component.html',
  styleUrls: ['./telescope-new.component.css']
})
export class TelescopeNewComponent implements OnInit {

  constructor(private http : HttpClient, private _snackBar: MatSnackBar) { }


  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  diameter : number ;
  focal : number ;
  fdratio : number;
  isAddingTelescope : boolean = false; 
  numberSelectedImages : number = 0;
  selectedFiles : File[] = [];
  totalSelectedFileSize  = 0.0;
  units : string = "";
  uploadProgress : Number = 0;


  ngOnInit(): void {
  }

  // retourne à la page précédente
  onReturn() 
  {
    this.navigationPanel.emit("");
  } 

  // autocomplétion du rapport f/d
  calculateRatio()
  {
    if (this.diameter > 0 && this.focal > 0)
    {
      this.fdratio = Math.round(10*this.focal/this.diameter)/10;
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
      this.isAddingTelescope = true;

      // variable formData
      const fd = new FormData();

      // add core data telescope
      fd.append('name', form.value.name);
      fd.append('aperture', form.value.aperture);
      fd.append('focal', form.value.focal);
      fd.append('fdratio', form.value.fdratio);
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
                        this.uploadProgress = Math.round(100 * event.loaded / event.total);
                        console.log("Upload progress : " + this.uploadProgress + " %");
                      }
                      else if (event.type === HttpEventType.Response)
                      {
                        if (event.body === "SUCCESS-TELESCOPE-DB-INS")
                        {
                          let snackBarRef = this._snackBar.open('Telescope created !', "close");
                          // téléchargement terminé
                          form.reset();
                          this.isAddingTelescope = false;
                          this.onReturn();
                        }
                        else if (event.body === "FAIL-TELESCOPE-DB-INS" || event.body === "FAIL-IMAGE-DB-INS")
                        {
                          // message d'erreur 
                          let snackBarRef = this._snackBar.open('A problem occured !', "close");
                          // reset du formulaire

                          

                          // téléchargement terminé
                          this.isAddingTelescope = false;
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
