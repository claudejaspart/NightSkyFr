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
  noImage : boolean = true;
  numberThumbs = 15;

  constructor(  private displayService : DisplayService, 
                private itemsStateService : ItemsStateService, 
                private http : HttpClient,
                private _snackBar: MatSnackBar,) { }

  ngOnInit(): void 
  {
    this.selectedItem = this.itemsStateService.getSelectedItem();

    // cleanup des champs description et manufacturer si vide
    if (!this.selectedItem.description.length)
      this.selectedItem.description = "None given"

    if (!this.selectedItem.manufacturer.length)
      this.selectedItem.manufacturer = "Unknown"
    
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
    console.log("calling fetchImages");
    this.http.get(url).subscribe(retrievedList => 
      {
        this.itemImages = retrievedList;
        console.log(retrievedList);
        this.createImageObject();
      });
  }

  createImageObject()
  {
      if(this.itemImages.length > 0)
      {
        // reset image
        this.noImage = false;
        this.imageObject = new Array();

        // boucle sur chaque ligne de retour de la requete
        for(let index=0; index < this.itemImages.length; index++)
        {
          this.imageObject.push(
            {
              image: this.itemImages[index].path.replace(/\\/g, '/'),
              thumbImage : this.itemImages[index].path.replace(/\\/g, '/')
            });
        }

        // si le nombre d'images est inférieure à x, on rajoute des images vides
        let numberImagesToAdd = this.itemImages.length - this.numberThumbs;
        console.log(numberImagesToAdd)
        if ( numberImagesToAdd > 0)
        {
            for (let index = 0; index < numberImagesToAdd; index++)
              this.imageObject.push(
                {
                  Image : "../../../../assets/Icons/general-icons/NoImage.svg",
                  thumbImage : "../../../../assets/Icons/general-icons/NoImage.svg"
                });
        }
        
      }
      else
      {
        this.imageObject = undefined;
        this.imageObject = new Array();
        for (let index=0; index<this.numberThumbs;index++)
          this.imageObject.push(
          {
            Image : "../../../../assets/Icons/general-icons/NoImage.svg",
            thumbImage : "../../../../assets/Icons/general-icons/NoImage.svg"
          });
      }
  }

  // gestion de la suppression d'une image
  deleteImage()
  {
    if (this.deleteImageEnabled && !this.noImage)
    {
      // delete message
      let snackBarRef = this._snackBar.open("Delete image ?", "Yes !", { duration: 2000, horizontalPosition:  'center'});  
      snackBarRef.onAction().subscribe(() => 
      {
        this.deleteItemSpecificImage(this.imageIndex);
      });
      snackBarRef.afterDismissed().subscribe(null, null, () => {});
    }
  }

  deleteItemSpecificImage(imageId:number)
  {
    let url = `/DeleteEquipmentImage?type=${this.type}&id=${this.itemImages[this.imageIndex].id}`;
    console.log(url);
    this.http.delete(url,{responseType: 'text'}).subscribe(event => 
      {
        if (event.includes('SUCCESS'))
          this.displaySnackbarMessage("Image deleted !","Success !",2000);
        else
          this.displaySnackbarMessage(event,"Error !",3000);

        // rafraichissement des images
        this.fetchItemImages();
      });
  }


  deleteAllImages()
  {
        // delete message
        let snackBarRef = this._snackBar.open("Delete all images ?", "Yes !", { duration: 2000, horizontalPosition:  'center'});  
        snackBarRef.onAction().subscribe(() => {
          this.deleteItemAllImages();        
        });
        snackBarRef.afterDismissed().subscribe(null, null, () => {});
  }



  deleteItemAllImages()
  {
    let url = `/DeleteAllEquipmentImages?type=${this.type}&itemId=${this.selectedItem.id}`;
    this.http.delete(url,{responseType: 'text'}).subscribe(event => 
      {
        if (event.includes('SUCCESS'))
          this.displaySnackbarMessage("Images deleted !","Success !",2000);
        else
          this.displaySnackbarMessage(event,"Error !",3000);

        // rafraichissement des images
        this.fetchItemImages();
      });
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

  displaySnackbarMessage(message:string, actionMessage: string, msDuration: number)
  {
        // delete message
        let snackBarRef = this._snackBar.open(message, actionMessage, { duration: msDuration, horizontalPosition:  'center'});  
  }


}
