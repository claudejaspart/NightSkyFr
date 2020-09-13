import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  constructor(private http : HttpClient) { }

  selectedAction : string = "add-telescope";
  selectedTelescope : string = "";
  displayMenu : boolean = true;

  /* liste des équipements */
  telescopeList : any;


  ngOnInit(): void 
  {
    this.getListTelescopes();
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
    this.http.get('/telescopes').subscribe((retrievedList) => this.telescopeList = retrievedList);
    // this.telescopeList = {};
    // this.telescopeList= [
    //   {"name" : "Ultra dob","aperture" : 66, "focal" : 450, "fdratio" : 5.2, "manufacturer" : "Claudio", "description" : "Grossissement max : 120x. Poids : 3.2kg" },
    //   {"name" : "Apo 66","aperture" : 66, "focal" : 450, "fdratio" : 5.2, "manufacturer" : "Claudio", "description" : "Grossissement max : 120x. Poids : 3.2kg" }
    // ];
    
  }


}
