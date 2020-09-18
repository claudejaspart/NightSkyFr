import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css']
})
export class ItemsDetailsComponent implements OnInit 
{
  @Input() selectedItem : any;
  
  constructor() { }

  ngOnInit(): void 
  {

  }

}
