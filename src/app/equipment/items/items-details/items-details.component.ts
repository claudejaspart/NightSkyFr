import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DisplayService } from '../../display.service';
import { ItemsStateService } from '../items-state.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgImageSliderComponent } from 'ng-image-slider';


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
  numberImages : number = 0;
  imageObject : Array<Object>;
  deleteImageEnabled = false;
  imageIndex : number = -1;
  iconUrl : string;
  noImage : boolean = true;
  numberThumbs : number = 15;
  isAddingImage : boolean = false;
 

  // mode edition
  editingField : string = "";
  oldValue = "";


  // slider control
  @ViewChild('nav') slider: NgImageSliderComponent;

  // image variables
  selectedFile : File;
  uploadProgress : Number = 100;

  constructor(  private displayService : DisplayService, 
                private itemsStateService : ItemsStateService, 
                private http : HttpClient,
                private _snackBar: MatSnackBar) { }

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
    this.http.get(url).subscribe(retrievedList => 
      {
         this.itemImages = retrievedList;
         this.createImageObject();
      });
  }

  createImageObject()
  {
      if(this.itemImages != undefined && this.itemImages.length > 0)
      {
        // reset image
        this.noImage = false;
        this.imageObject = new Array();
        this.numberImages = this.itemImages.length;

        // boucle sur chaque ligne de retour de la requete
        for(let index=0; index < this.numberImages; index++)
        {
          this.imageObject.push(
            {
              image: this.itemImages[index].path.replace(/\\/g, '/'),
              thumbImage : this.itemImages[index].path.replace(/\\/g, '/')
            });
        }

        // si le nombre d'images est inférieure à x, on rajoute des images vides
        let numberImagesToAdd = this.numberThumbs - this.itemImages.length;        
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
        this.numberImages = 0;
        for (let index=0; index<this.numberThumbs;index++)
          this.imageObject.push(
          {
            Image : "../../../../assets/Icons/general-icons/NoImage.svg",
            thumbImage : "../../../../assets/Icons/general-icons/NoImage.svg"
          });
      }
  }

  // controls sliders
  prevImageClick() { this.slider.prev(); }
  nextImageClick() { this.slider.next(); }

  // *************************************
  // gestion de la suppression d'une image
  // *************************************
  deleteImage()
  {
    if (this.deleteImageEnabled && !this.noImage && this.imageIndex < this.itemImages.length)
    {
      // delete message
      let snackBarRef = this._snackBar.open("Delete image ?", "Yes !", { duration: 1000, horizontalPosition:  'center'});  
      snackBarRef.onAction().subscribe(() => 
      {
        this.deleteItemSpecificImage(this.imageIndex);
        
      });
      //snackBarRef.afterDismissed().subscribe(() => {});
    }
  }

  deleteItemSpecificImage(imageId:number)
  {
    let url = `/DeleteEquipmentImage?type=${this.type}&id=${this.itemImages[this.imageIndex].id}`;
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
        snackBarRef.onAction().subscribe(() => 
        {
          this.deleteItemAllImages();        
        });
        
        snackBarRef.afterDismissed().subscribe(() => {});
  }



  deleteItemAllImages()
  {
    let url = `/DeleteAllEquipmentImages?type=${this.type}&itemId=${this.selectedItem.id}`;
    this.http.delete(url,{responseType: 'text'}).subscribe(result => 
      {
        if (result.includes('SUCCESS'))
          this.displaySnackbarMessage("Images deleted !","Success !",1000);
        else
          this.displaySnackbarMessage("Images not deleted !","Error !",1000);

        // rafraichissement des images
        this.fetchItemImages();
      });
  }

  // ***************************
  // Selection des images
  // ***************************
  chooseFile(file)
  {
    this.selectedFile = file[0];    
    this.onImageUpload();
  }

  onImageUpload()
  {
      // variable formData
      let fd = new FormData();
      this.isAddingImage = true

      // ajout des images
      fd.append('image', this.selectedFile, this.selectedFile.name);

      // envoi de la requete http
      this.http.post( `addEquipmentImage?type=${this.type}&itemId=${this.selectedItem.id}&itemName=${this.selectedItem.name}`, 
                      fd, 
                      {responseType: 'text', reportProgress: true, observe: 'events'}
                    ).subscribe(
                    event => 
                    {
                      if (event.type === HttpEventType.UploadProgress)
                      {
                        this.uploadProgress = Math.round(100 * event.loaded / event.total);
                      }
                      else if (event.type === HttpEventType.Response)
                      {
                        if (event.body.includes('SUCCESS') && this.uploadProgress === 100)
                        {
                          this.fetchItemImages();
                          setTimeout(()=>this.isAddingImage = false, 1500);
                        }
                        else if (event.body.includes('FAIL'))
                          this._snackBar.open(event.body, "Error !", { duration: 1500, horizontalPosition:  'center'});  
                      }
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
        this._snackBar.open(message, actionMessage, { duration: msDuration, horizontalPosition:  'center'});  
  }

  /* ************************* */
  /* Editing fields logic      */
  /* ************************* */
  editField(field)
  {
    if (this.editingField.length === 0)
    {
      this.editingField = field;
      this.oldValue= this.selectedItem[this.editingField];
    }
    else
      this.displaySnackbarMessage("Editing another field !","Ooops !", 1000);
  }

  saveField()
  {
    // calcul du rapport f/d
    if (this.type==='telescope' && (this.editingField==='aperture' || this.editingField==='focal'))
      this.calculateRatio();
    
    // sauvegarde des données
    this.saveData();

    // reset mode edition
    this.editingField = "";
  }

  saveData()
  {
    const bodyContent = 
    {
      itemType :  this.type,
      itemId : this.selectedItem.id,
      fieldName : this.editingField,
      fieldValue : this.selectedItem[this.editingField]
    };

    let url = `/SaveEquipmentDataField`;
    this.http.post(url, bodyContent ,{responseType: 'text', observe: 'events'}).subscribe(event => 
    {
      if (event.type === HttpEventType.Response)
      {
        if (event.body.includes('SUCCESS'))
          this.displaySnackbarMessage("Field updated !","Success !", 1000);
        else
        {
          this.displaySnackbarMessage("Updating went wrong !","Error !", 1000);
          this.selectedItem[this.editingField] = this.oldValue;
        }
      }
    });
  }

  // calcul du rapport f/d
  calculateRatio()
  {
    if (this.selectedItem.aperture > 0 && this.selectedItem.focal > 0)
    {
      this.selectedItem.fdratio = Math.round(10*this.selectedItem.focal/this.selectedItem.aperture) / 10;
    }
  }

  cancelEditing()
  {
    this.selectedItem[this.editingField] = this.oldValue;
    this.editingField = "";
  }

}
