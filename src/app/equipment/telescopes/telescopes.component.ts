import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.css']
})
export class TelescopesComponent implements OnInit {

  constructor() { }

  currentSelection : string = "equipment";

  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }



  onAddTelescope() 
  {
    console.log("add a telescope");
    this.navigationPanel.emit('add-telescope');
  }   

}
