import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  constructor() { }

  selectedAction : string = "add-telescope";
  displayMenu : boolean = true;


  ngOnInit(): void {
  }

  onActionSelected(action : string):void
  {
    console.log("equipment sees : " + action);
    this.displayMenu = action.length > 0 ? false : true;
    this.selectedAction = action;
  }

}
