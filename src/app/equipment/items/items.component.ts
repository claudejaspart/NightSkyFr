import { Component, Input, OnInit } from '@angular/core';
import { ItemsStateService } from './items-state.service';
import { ItemsFetchService } from './items-fetch.service';


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

  selectedItem = 
  {
    "type" : "",
    "iconUrl" : "",
    "details" : ""
  };

  itemData = 
  {
    "name" : "",
    "iconUrl" : "",
    "col1" : "",
    "col2" : "",
    "col3" : "",
    "col4" : "",
    "list" : ""
  };
  
  constructor(private itemState : ItemsStateService, 
              private itemsFetchService : ItemsFetchService) { }

  ngOnInit(): void 
  {
    // Initialisation du composant
    switch(this.type)
    {
      case "telescope" :
          this.itemData.name = "Telescopes";
          this.itemData.iconUrl="../../../assets/Icons/equipment/telescope.png";
          this.itemData.col1 = "Name";
          this.itemData.col2 = "Diam.";
          this.itemData.col3 = "Focal";
          this.itemData.col4 = "F/D";
          this.itemData.list = this.itemsFetchService.getListItems(this.type);
          break;

      case "eyepiece" :
        this.itemData.name = "Eyepieces";
        this.itemData.iconUrl="../../../assets/Icons/equipment/eyepiece.png";
        this.itemData.col1 = "Name";
        this.itemData.col2 = "Focal";
        this.itemData.col3 = "AFOV";
        this.itemData.col4 = "Constr.";
        break;

      case "binoculars" :
        this.itemData.name = "Binoculars";
        this.itemData.iconUrl="../../../assets/Icons/equipment/binoculars.png";
        this.itemData.col1 = "Name";
        this.itemData.col2 = "Diam.";
        this.itemData.col3 = "Magn.";
        this.itemData.col4 = "AFOV";
        break;

      case "filter" :
        this.itemData.name = "Filters";
        this.itemData.iconUrl="../../../assets/Icons/equipment/filter.png";
        // todo //
        break;

      case "barlow" :
        this.itemData.name = "Adapters";
        this.itemData.iconUrl="../../../assets/Icons/equipment/barlow.png";
        // todo //
        break;
    }

    this.itemState.setState('list');

  }

  ngDoCheck(): void
  {
    this.currentItemState = this.itemState.getState();
    this.currentSelectedItemIndex = this.itemState.getSelectedItemIndex();
    // on remplit l'objet sélectionné
    if (this.currentSelectedItemIndex >= 0)
    {
      console.log("details")
      this.selectedItem.type = this.type;
      this.selectedItem.iconUrl = this.itemData.iconUrl;
      this.selectedItem.details = this.itemData.list[this.currentSelectedItemIndex];
    }
  }

}
