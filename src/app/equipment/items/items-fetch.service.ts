import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsFetchService {

  itemsList : any;

  constructor(private http : HttpClient) 
  { 

  }

  fetchListItems() : any
  {
    this.http.get('/telescopes').subscribe((retrievedList) => 
    { 
      this.itemsList = retrievedList;
      console.log("fetched : ");
      console.log(this.itemsList);
    });
  }

  getListItems()
  {
    console.log("retrieved : ");
    console.log(this.itemsList);
    return this.itemsList;
  }
}
