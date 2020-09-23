import { Component, Input, OnInit } from '@angular/core';
import { ItemsStateService } from './items-state.service';
import { ItemsFetchService } from './items-fetch.service'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit
{

  @Input() type : string = "generic";
  currentItemState : string = "";
  currentSelectedItemIndex : number;
  newItemFields : any;
  detailsItemFields : any;

  constructor(private itemState : ItemsStateService, private itemsFetchService : ItemsFetchService) { }

  ngOnInit(): void 
  {
    this.itemState.setState('list');    // récupération de la liste
  }

  ngDoCheck(): void
  {
    this.currentItemState = this.itemState.getState();
  }

}
