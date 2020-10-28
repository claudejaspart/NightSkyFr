import { Component, OnInit } from '@angular/core';
import { ObservationListsStateService } from './observation-lists-state.service';

@Component({
  selector: 'app-observation-lists',
  templateUrl: './observation-lists.component.html',
  styleUrls: ['./observation-lists.component.css']
})
export class ObservationListsComponent implements OnInit 
{
  currentObsListState : string = "list";

  constructor(private obsListState : ObservationListsStateService) { }

  ngOnInit(): void 
  {
    this.obsListState.setState('list');    // récupération de la liste
  }

  ngDoCheck(): void
  {
    this.currentObsListState = this.obsListState.getState();
  }

  createItem(type : string)
  {
    this.obsListState.setState('create');
  }

}
