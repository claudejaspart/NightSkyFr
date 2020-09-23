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
  @Input() type : string;
  selectedItem : any;
  iconUrl : string;

  constructor(private displayService : DisplayService, private itemsStateService : ItemsStateService) { }

  ngOnInit(): void 
  {
    this.selectedItem = this.itemsStateService.getSelectedItem();
    console.log(this.selectedItem);

    // initialisation en fonction du type;
    switch(this.type)
    {
      case 'telescope':
        this.iconUrl = "../../../../assets/Icons/equipment/telescope.png";
        break;
      case 'eyepiece':
        this.iconUrl = "../../../../../assets/Icons/equipment/eyepiece.png";
        break;
      case 'binoculars':
        this.iconUrl = "../../../../../assets/Icons/equipment/binoculars.png";
        break;
    }
  }

  // returning to the list of items
  onReturn()
  {
    this.itemsStateService.setState('list');
    this.displayService.setDisplayStatus('all');
  }

}
