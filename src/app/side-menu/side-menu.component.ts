import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  currentSelection : string = "equipment";

  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }



  onSelectPage(selectedPage) 
  {
    // retourne la page choisie
    console.log("Page choisie : " + selectedPage);
    this.currentSelection = selectedPage;
    this.navigationPanel.emit(selectedPage);
  }   


}
