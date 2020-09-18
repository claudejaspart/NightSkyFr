import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DisplayService } from './display.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  constructor(private http : HttpClient, private displayService : DisplayService) { }

  selectedAction : string = "add-telescope";
  selectedTelescope : string = "";
  displayMenu : boolean = true;
  displayStatus:string = this.displayService.getDisplayStatus();

  /* liste des équipements */
  telescopeList : any;


  ngOnInit(): void 
  {
    //this.getListTelescopes();
    this.displayService.setDisplayStatus('all');
  }

  ngDoCheck(): void
  {
    this.displayStatus = this.displayService.getDisplayStatus();
  }

  onActionSelected(action : string):void
  {
    this.getListTelescopes();
    this.displayMenu = action.length > 0 ? false : true;
    this.selectedAction = action;
  }

  onSelectedTelescope(selectedTelescope : string):void
  {
    this.selectedTelescope = selectedTelescope;
  }

  getListTelescopes() 
  {
    //this.http.get('/telescopes').subscribe((retrievedList) => this.telescopeList = retrievedList);
    // this.telescopeList = {};
    // this.telescopeList= [
    //   {"name" : "Ultra dob","aperture" : 66, "focal" : 450, "fdratio" : 5.2, "manufacturer" : "Claudio", "description" : "Grossissement max : 120x. Poids : 3.2kg" },
    //   {"name" : "Apo 66","aperture" : 66, "focal" : 450, "fdratio" : 5.2, "manufacturer" : "Claudio", "description" : "Grossissement max : 120x. Poids : 3.2kg" }
    // ];
    
  }


}
