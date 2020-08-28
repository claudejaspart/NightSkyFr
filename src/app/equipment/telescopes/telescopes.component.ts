import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.css']
})
export class TelescopesComponent implements OnInit {

  constructor() {}

  currentSelection : string = "equipment";

  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  @Input() telescopes;
  

  ngOnInit(): void 
  {
    
  }



  onAddTelescope() 
  {
    this.navigationPanel.emit('add-telescope');
  }   

}

