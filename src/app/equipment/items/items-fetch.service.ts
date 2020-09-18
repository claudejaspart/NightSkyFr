import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsFetchService {

  itemsList : any;

  constructor(private http : HttpClient) { }

  getListItems(type:string): any
  {
    switch(type)
    {
      case 'telescope' :

        this.itemsList= [
             {'name' : 'Ultra dob','aperture' : 66, 'focal' : 450, 'fdratio' : 5.2, 'manufacturer' : 'Claudio', 'description' : 'Grossissement max : 120x. Poids : 3.2kg' },
             {'name' : 'Apo 66','aperture' : 66, 'focal' : 450, 'fdratio' : 5.2, 'manufacturer' : 'Claudio', 'description' : 'Grossissement max : 120x. Poids : 3.2kg' }
           ];
        this.http.get('/telescopes').subscribe((retrievedList) => this.itemsList = retrievedList);
        break;

      case 'eyepiece' :
        //this.http.get('/eyepieces').subscribe((retrievedList) => this.itemsList = retrievedList);
        break;

      case 'binoculars' :
        //this.http.get('/binoculars').subscribe((retrievedList) => this.itemsList = retrievedList);
        break;
    }

    return this.itemsList;
  }
}
