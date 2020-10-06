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
    // common variables
    name : string = "";
    isAddingItem : boolean = false; 
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

  // returning to the list of items
  onReturn()
  {
    this.siteStateService.setItemWasCreated();
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
    let isFormValid = false;
    //isFormValid = (this.name.length && this.telescopeFocal && this.telescopeDiameter && this.telescopeFDRatio ? true : false);
    return isFormValid;
  }

  onSubmit(form : NgForm)
  {}

}
