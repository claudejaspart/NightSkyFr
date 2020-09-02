import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetailsService } from '../../../details.service';

@Component({
  selector: 'app-telescope-details',
  templateUrl: './telescope-details.component.html',
  styleUrls: ['./telescope-details.component.css']
})
export class TelescopeDetailsComponent implements OnInit {

  telescope : any;
  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private detailsService : DetailsService) {}

  @Input() telescopeName : string;

  ngOnInit(): void 
  {
    this.telescope = this.detailsService.getData();
    console.log(this.telescope);
  }

    // retourne à la page précédente
    onReturn() 
    {
      this.navigationPanel.emit("");
    } 

}
