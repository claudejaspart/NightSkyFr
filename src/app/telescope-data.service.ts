import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelescopeDataService 
{

  telescope : string = "";

  constructor() { }

  addData(data : string)
  {
    this.telescope = data;
  }

  getData(): string
  {
    return this.telescope;
  }
}
