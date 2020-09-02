import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService 
{

  detailsSelected : string = "";

  constructor() { }

  addData(details : string)
  {
    this.detailsSelected = details;
  }

  getData(): string
  {
    return this.detailsSelected;
  }

}
