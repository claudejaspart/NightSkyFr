import { Component, Input, OnInit } from '@angular/core';
import { DisplayService } from '../../display.service';
import { ItemsStateService } from '../items-state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit 
{

  @Input() type : string = ""

  // titre du composant
  iconUrl : string = "";
  title : string = "";

  // colonnes du tableau de la liste
  col0 : string = "Name";
  col1 : string = "";
  col2 : string = "";
  col3 : string = "";

  itemsData: any = [
    {'name' : 'Ultra dob','aperture' : 66, 'focal' : 450, 'fdratio' : 5.2, 'manufacturer' : 'Claudio', 'description' : 'Grossissement max : 120x. Poids : 3.2kg' },
    {'name' : 'Apo 66','aperture' : 66, 'focal' : 450, 'fdratio' : 5.2, 'manufacturer' : 'Claudio', 'description' : 'Grossissement max : 120x. Poids : 3.2kg' }
  ];
  

  constructor(private displayService : DisplayService, 
              private itemsState : ItemsStateService,
              private http : HttpClient) { }

  ngOnInit(): void 
  {
    // initialisation en fonction du type;
    switch(this.type)
    {
      case 'telescope':
        this.iconUrl = "../../../assets/Icons/equipment/telescope.png";
        this.title = "My telescopes";
        this.col1 = "Diam.";
        this.col2 = "Focal";
        this.col3= "F/D";
        break;
      case 'eyepiece':
        this.iconUrl = "../../../../assets/Icons/equipment/eyepiece.png";
        this.title = "My eyepieces";
        this.col1 = "Focal";
        this.col2 = "AFOV";
        this.col3= "Constr.";
        break;
      case 'binoculars':
        this.iconUrl = "../../../../assets/Icons/equipment/binoculars.png";
        this.title = "My binoculars";
        this.col1 = "Diam.";
        this.col2 = "Magn.";
        this.col3= "AFOV";
        break;
    }

    this.fetchItems(this.type);
  }

  createItem(type : string)
  {
    this.itemsState.setState('create');
    this.displayService.setDisplayStatus(this.type);
  }

  onSelectedItem(index : number)
  {
    this.itemsState.setState('details');
    this.itemsState.setSelectedItem(this.itemsData[index]);
    this.displayService.setDisplayStatus(this.type);
  }

  ngDoCheck(): void
  {
     if (this.itemsState.hasItemDataChanged())
     {
        this.fetchItems(this.type);
        this.itemsState.resetCreationAndModificationStates();
     }
  }

  fetchItems(type : string)
  {
    let url = type + (type !== 'binoculars' ? "s" : "");    
    this.http.get('/' + url).subscribe(retrievedList => this.itemsData = retrievedList);
  }

}
