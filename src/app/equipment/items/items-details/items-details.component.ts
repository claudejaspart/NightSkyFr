import { Component, Input, OnInit } from '@angular/core';
import { DisplayService } from '../../display.service';
import { ItemsStateService } from '../items-state.service';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css']
})
export class ItemsDetailsComponent implements OnInit 
{
  @Input() selectedItem : any;
  
  constructor(private displayService : DisplayService, private itemsStateService : ItemsStateService) { }

  ngOnInit(): void 
  {

  }

  // returning to the list of items
  onReturn()
  {
    this.itemsStateService.setState('list');
    this.displayService.setDisplayStatus('all');
  }

}
