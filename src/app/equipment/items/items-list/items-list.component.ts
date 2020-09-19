import { Component, Input, OnInit } from '@angular/core';
import { DisplayService } from '../../display.service';
import { ItemsStateService } from '../items-state.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit 
{

  @Input() type : string = ""
  @Input() itemData;
  newItem : any;


  constructor(private displayService : DisplayService, 
              private itemState : ItemsStateService) { }

  ngOnInit(): void 
  {
  }

  createItem(type : string)
  {
    this.itemState.setState('create');
    this.displayService.setDisplayStatus(this.type);
  }

  onSelectedItem(index : number)
  {
    this.itemState.setState('details');
    this.itemState.setSelectedItemIndex(index);
    this.displayService.setDisplayStatus(this.type);
  }

}
