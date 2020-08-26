import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-telescope-new',
  templateUrl: './telescope-new.component.html',
  styleUrls: ['./telescope-new.component.css']
})
export class TelescopeNewComponent implements OnInit {

  constructor() { }


  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  diameter : number ;
  focalLength : number ;
  fdRatio : number;

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
    if (this.diameter > 0 && this.focalLength > 0)
    {
      this.fdRatio = Math.round(10*this.focalLength/this.diameter)/10;
    }
  }

 
}
