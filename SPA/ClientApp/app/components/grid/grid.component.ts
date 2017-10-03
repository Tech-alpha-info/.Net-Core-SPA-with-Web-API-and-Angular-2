import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { data } from './company';



@Component({
  selector: 'multi-click-selection-demo',
  templateUrl: './grid.component.html'
})
export class GridComponent  {


  rows = [];
  selected = [];


  columns: any[] = [
    { prop: 'name'} , 
    { name: 'Company' }, 
    { name: 'Gender' }
  ];


  
  constructor(public toastr: ToastsManager, viewContainer: ViewContainerRef) {
      this.rows = data;
      this.toastr.setRootViewContainerRef(viewContainer);
  }

    


  // Add selected name to list of selected...
  onSelect({ selected }) {

    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    
    
  }


  // All events come through here...
  onActivate(event) {
      console.log('Activate Event', event);

      if (event.type) {
          if (event.type == "click") {
              this.showInfo("Clicked: " + event.row.name);
          }
      }
  }





  showSuccess(message: string) {
      this.toastr.success(message, 'Success');
  }


  showInfo(message: string) {
      this.toastr.info(message);
  }


}
