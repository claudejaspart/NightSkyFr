import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-telescope-new',
  templateUrl: './telescope-new.component.html',
  styleUrls: ['./telescope-new.component.css']
})
export class TelescopeNewComponent implements OnInit {

  constructor(private http : HttpClient) { }


  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  diameter : number ;
  focal : number ;
  fdratio : number;
  isAddingTelescope : boolean = false; 
  isFormValid : boolean = true;
  numberSelectedImages : number = 0;
  selectedFiles : File[] = [];


  ngOnInit(): void {
  }

  // retourne à la page précédente
  onReturn() 
  {
    console.log("going back");
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

    for(let i=0; i<file.length;i++)
      this.selectedFiles.push(file[i]);
  }

  onSubmit(form : NgForm)
  {
    this.isFormValid = form.valid;

    if (this.isFormValid)
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
      this.http.post( "/addTelescope" , fd, {responseType: 'text'}).subscribe(
        data => 
        {
          this.isAddingTelescope = false;
          console.log(data);
        });
      
    }
    else
    {
      console.log("form is not valid !!")
    }
  }


  getNumberSelectedImages()
  {
    if (this.numberSelectedImages === 0)
      return "";
    else if (this.numberSelectedImages === 1)
      return "1 selected";
    else
      return `${this.numberSelectedImages} selected`;
  }
}
