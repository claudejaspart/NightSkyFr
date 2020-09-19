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

  displayMenu : boolean = true;
  displayStatus:string = this.displayService.getDisplayStatus();


  ngOnInit(): void 
  {
    this.displayService.setDisplayStatus('all');
  }

  ngDoCheck(): void
  {
    this.displayStatus = this.displayService.getDisplayStatus();
  }

}
