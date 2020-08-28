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

  openDialog()
  {

  }

  onSubmit(form : NgForm)
  {
    // console.log(form.value.name);
    // console.log(form.value.manufacturer);
    // console.log(form.value.aperture);
    // console.log(form.value.focal);
    // console.log(form.value.fdratio);
    // console.log(form.value.description);

    const newTelescope =  
    {
        "name" : form.value.name,
        "aperture" : form.value.aperture,
        "focal" : form.value.focal,
        "fdratio" : form.value.fdratio,
        "manufacturer" : form.value.manufacturer,
        "description" : form.value.description
    };

    const url = "/addTelescope";

    this.isFormValid = form.valid

    if (this.isFormValid)
    {
      this.isAddingTelescope = true;
      this.http.post(url , newTelescope, {responseType: 'text'}).toPromise().then(data => 
      {
        // console.log(data);
        // todo : rediriger vers la page de détails du telescope si tout s'est bien passé
        this.isAddingTelescope = false;
      });
    }
  }
}
