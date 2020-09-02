import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DetailsService } from '../../details.service';


@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.css']
})
export class TelescopesComponent implements OnInit {

  constructor(private detailsService : DetailsService) {}

  currentSelection : string = "equipment";

  @Output() navigationPanel : EventEmitter<string> = new EventEmitter<string>();
  @Input() telescopes;
  

  ngOnInit(): void 
  {
    
  }



  onAddTelescope() 
  {
    this.navigationPanel.emit('telescope-add');
  }   

  onSelectTelescope(index: number)
  {
    console.log("from telescope list : " + index);
    this.detailsService.addData(this.telescopes[index]);
    this.navigationPanel.emit('telescope-details');
  }

}

