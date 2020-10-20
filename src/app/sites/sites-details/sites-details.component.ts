import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SiteStateService } from '../site-state.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-sites-details',
  templateUrl: './sites-details.component.html',
  styleUrls: ['./sites-details.component.css']
})
export class SitesDetailsComponent implements OnInit {

  selectedSite : any;
  siteImages : any;
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

  constructor( private siteStateService : SiteStateService, 
               private http : HttpClient,
               private _snackBar: MatSnackBar) { }

  ngOnInit(): void 
  {
    this.selectedSite = this.siteStateService.getSelectedSite();

    // cleanup des champs description
    if (!this.selectedSite.description.length)
      this.selectedSite.description = "None given";

    this.fetchSiteImages();

  }

  // returning to the list of [[[site]]]s
  onReturn()
  {
    this.siteStateService.setState('list');
  }

  fetchSiteImages()
  {
    let url = `/SiteImages?id=${this.selectedSite.id}`;
    this.http.get(url).subscribe(retrievedList => 
      {
         this.siteImages = retrievedList;
         this.createImageObject();
      });
  }

  createImageObject()
  {
      if(this.siteImages != undefined && this.siteImages.length > 0)
      {
        // reset image
        this.noImage = false;
        this.imageObject = new Array();
        this.numberImages = this.siteImages.length;

        // boucle sur chaque ligne de retour de la requete
        for(let index=0; index < this.numberImages; index++)
        {
          this.imageObject.push(
            {
              image: this.siteImages[index].path.replace(/\\/g, '/'),
              thumbImage : this.siteImages[index].path.replace(/\\/g, '/')
            });
        }

        // si le nombre d'images est inférieure à x, on rajoute des images vides
        let numberImagesToAdd = this.numberThumbs - this.siteImages.length;        
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
    if (this.deleteImageEnabled && !this.noImage && this.imageIndex < this.siteImages.length)
    {
      // delete message
      let snackBarRef = this._snackBar.open("Delete image ?", "Yes !", { duration: 1000, horizontalPosition:  'center'});  
      snackBarRef.onAction().subscribe(() => 
      {
        this.deleteSiteSpecificImage(this.imageIndex);
        
      });
    }
  }

  deleteSiteSpecificImage(imageId:number)
  {
    let url = `/DeleteSiteImage?id=${this.siteImages[imageId].id}`;
    this.http.delete(url,{responseType: 'text'}).subscribe(event => 
      {
        if (event.includes('SUCCESS'))
          this.displaySnackbarMessage("Image deleted !","Success !",2000);
        else
          this.displaySnackbarMessage(event,"Error !",3000);

        // rafraichissement des images
        this.fetchSiteImages();
      });
  }


  deleteAllImages()
  {
        // delete message
        let snackBarRef = this._snackBar.open("Delete all images ?", "Yes !", { duration: 2000, horizontalPosition:  'center'});  
        snackBarRef.onAction().subscribe(() => 
        {
          this.deleteSiteAllImages();        
        });
        
        snackBarRef.afterDismissed().subscribe(() => {});
  }



  deleteSiteAllImages()
  {
    let url = `/DeleteAllSiteImages?siteId=${this.selectedSite.id}`;
    this.http.delete(url,{responseType: 'text'}).subscribe(result => 
      {
        if (result.includes('SUCCESS'))
          this.displaySnackbarMessage("Images deleted !","Success !",1000);
        else
          this.displaySnackbarMessage(result ,"Error !",1000);

        // rafraichissement des images
        this.fetchSiteImages();
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
      this.http.post( `AddSiteImage?SiteId=${this.selectedSite.id}&Name=${this.selectedSite.name}`, 
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
                          this.fetchSiteImages();
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
      this.oldValue= this.selectedSite[this.editingField];
    }
    else
      this.displaySnackbarMessage("Editing another field !","Ooops !", 1000);
  }

  saveField()
  {
    // sauvegarde des données
    this.saveData();

    // reset mode edition
    this.editingField = "";
  }

  saveData()
  {
    const bodyContent = 
    {
      siteId : this.selectedSite.id,
      fieldName : this.editingField,
      fieldValue : this.selectedSite[this.editingField]
    };

    let url = `/SaveSiteDataField`;
    this.http.post(url, bodyContent ,{responseType: 'text', observe: 'events'}).subscribe(event => 
    {
      if (event.type === HttpEventType.Response)
      {
        if (event.body.includes('SUCCESS'))
          this.displaySnackbarMessage("Field updated !","Success !", 1000);
        else
        {
          this.displaySnackbarMessage("Updating went wrong !","Error !", 1000);
          this.selectedSite[this.editingField] = this.oldValue;
        }
      }
    });
  }


  cancelEditing()
  {
    this.selectedSite[this.editingField] = this.oldValue;
    this.editingField = "";
  }

}
