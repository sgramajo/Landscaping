import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ParkService } from '../../../services/park.service'; 

export interface ConfirmModal {
  id: string;  
  parkString: string; 
}

@Component({
  selector: 'edit',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                   </div>
                   <div class="modal-body">
                     <div class="row">
                        <div class="container">
                          <div class="form-group">
                            <input type="text" class="form-control" [(ngModel)]="selectedValue" />
                          </div>
                        </div>
                     </div>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary col-6" (click)="deleteItem();">Delete</button>
                     <button type="button" class="btn btn-default col-6" (click)="updateItem();">Update</button>
                   </div>
                 </div>
                </div>`
})
export class EditComponent extends DialogComponent<ConfirmModal, boolean> implements ConfirmModal {
  id:string; 
  parkString: string; 
  selectedValue = null; 
  constructor(dialogService: DialogService, 
              private firebaseService : ParkService) {
    super(dialogService);
  }
  ngOnInit() {
    this.selectedValue = this.parkString; 
  }
  closeModal(){
    this.close();
  }

  updateItem(){
    let parkItem = {
      park: this.selectedValue 
    }
    this.firebaseService.updatingPark(this.id, parkItem);
    this.close(); 
  }

  deleteItem(){
    this.firebaseService.deletePark(this.id);
    this.close();  
  }
}
