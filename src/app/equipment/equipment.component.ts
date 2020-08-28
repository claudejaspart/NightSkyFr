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
  displayMenu : boolean = true;

  /* liste des équipements */
  telescopeList : any;


  ngOnInit(): void 
  {
    this.getListTelescopes();
  }

  onActionSelected(action : string):void
  {
    this.displayMenu = action.length > 0 ? false : true;
    this.selectedAction = action;
  }

  getListTelescopes() 
  {
    this.http.get('/telescopes').subscribe((retrievedList) => this.telescopeList = retrievedList);
  }

}
