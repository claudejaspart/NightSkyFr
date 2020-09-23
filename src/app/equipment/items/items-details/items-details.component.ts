import { Component, Input, OnInit } from '@angular/core';
import { DisplayService } from '../../display.service';
import { ItemsStateService } from '../items-state.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css']
})
export class ItemsDetailsComponent implements OnInit 
{
  @Input() type : string;
  selectedItem : any;
  itemImages : any;
  imageObject : Array<Object>;
  deleteImageEnabled = false;
  imageIndex : number = -1;
  iconUrl : string;

  constructor(  private displayService : DisplayService, 
                private itemsStateService : ItemsStateService, 
                private http : HttpClient,
                private _snackBar: MatSnackBar,) { }

  ngOnInit(): void 
  {
    this.selectedItem = this.itemsStateService.getSelectedItem();
    
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

    this.fetchItemImages();
  }

  // returning to the list of items
  onReturn()
  {
    this.itemsStateService.setState('list');
    this.displayService.setDisplayStatus('all');
  }

  fetchItemImages()
  {
    let url = `/EquipmentImages?type=${this.type}&id=${this.selectedItem.id}`;
    this.http.get(url).subscribe(retrievedList => 
      {
        this.itemImages = retrievedList;
        this.createImageObject();
      });
  }

  createImageObject()
  {
      if(this.itemImages != undefined)
      {
        // reset image
        this.imageObject = new Array();

        // boucle sur chaque ligne de retour de la requete
        for(let index=0; index < this.itemImages.length; index++)
        {
          this.imageObject.push(
            {
              image: this.itemImages[index].path.replace(/\\/g, '/'),
              thumbImage : this.itemImages[index].path.replace(/\\/g, '/')
            }
          );
        }
      }
  }

  // gestion de la suppression d'une image
  deleteImage()
  {
    if (this.deleteImageEnabled)
    {
      // delete message
      let snackBarRef = this._snackBar.open("Delete image ?", "Yes !", { duration: 2000, horizontalPosition:  'center'});  
      snackBarRef.onAction().subscribe(() => {
        console.log('The snack-bar action was triggered!');
      });
      snackBarRef.afterDismissed().subscribe(null, null, () => {});
    }
  }

  getIndex(index : number)
  {
    this.imageIndex = index;
    this.deleteImageEnabled = true;
  }

  disableDeleteImage()
  {
    this.deleteImageEnabled = false;
  }


}
