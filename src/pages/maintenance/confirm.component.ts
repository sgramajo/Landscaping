import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { MaintenanceService } from '../../services/maintenance.service'; 

export interface ConfirmModel {
  park: string; 
  date: string; 
  edger: number; 
  trimming: number; 
  plantsRemove: number; 
  mow: number;
  weedeater: number;
  id: string;  
}

@Component({
  selector: 'confirm',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-body">
                     <div class="row">
                        <div class='col-6'>
                            <div class="imgTitle">Mowing</div>
                            <div id="mow" (click)="addClass('mow')">
                                <button type="button" class="close white">&times;</button>
                                <img src="assets/mow.png">
                            </div>
                        </div>
                        <div class='col-6'>
                            <div class="imgTitle">Trimming</div>
                            <div id="trimming" (click)="addClass('trimming')">
                                <button type="button" class="close white">&times;</button>
                                <img src="assets/trimming.png">
                            </div>
                        </div>                        
                     </div>
                     <div class="row">
                        <div class='col-6'>
                            <div class="imgTitle">Plants</div>
                            <div id="plantsRemove" (click)="addClass('plantsRemove')">
                                <button type="button" class="close white">&times;</button>
                                <img src="assets/sprout.png">
                            </div>
                        </div>
                        <div class='col-6'>
                            <div class="imgTitle">Edger</div>
                            <div id="edger" (click)="addClass('edger')">
                                <button type="button" class="close white">&times;</button>
                                <img src="assets/edger.png">
                            </div>
                        </div>                        
                     </div>
                     <div class="row">
                        <div class="col-6">
                            <div class="imgTitle">Weedeater</div>
                            <div id="weedeater" (click)="addClass('weedeater')">
                                <button type="button" class="close white">&times;</button>
                                <img src="assets/lawn_mower.png">
                            </div>
                        </div>
                     </div>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary col-6" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default col-6" (click)="cancel()">Cancel</button>
                   </div>
                 </div>
                </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  park: string; 
  date: string;  
  edger: number; 
  trimming: number; 
  plantsRemove: number; 
  mow: number; 
  weedeater: number; 
  id:string; 
  constructor(dialogService: DialogService, 
              private maintenanceService : MaintenanceService) {
    super(dialogService);
  }
  ngOnInit() {
      if(this.edger != null){
          if(this.edger == 1)
            document.getElementById("edger").classList.add("blue");
          if(this.trimming == 1)
            document.getElementById("trimming").classList.add("blue"); 
          if(this.plantsRemove == 1)
            document.getElementById("plantsRemove").classList.add("blue");
          if(this.mow == 1)
            document.getElementById("mow").classList.add("blue");  
          if(this.weedeater == 1)
            document.getElementById("weedeater").classList.add("blue");
      } 
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    this.addElement(); 
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
  addClass(id){
    document.getElementById(id).classList.toggle("blue"); 
  }
  addElement(){
    var edger = (document.getElementById("edger").classList.contains("blue")? 1 : 0); 
    var mow = (document.getElementById("mow").classList.contains("blue")? 1 : 0); 
    var plantsRemove = (document.getElementById("plantsRemove").classList.contains("blue")? 1 : 0); 
    var trimming = (document.getElementById("trimming").classList.contains("blue")? 1 : 0); 
    var weedeater = (document.getElementById("weedeater").classList.contains("blue")? 1 : 0); 
    if(this.id != null && edger == 0 && mow == 0 && plantsRemove == 0 && trimming == 0 && weedeater == 0){ //delete the element
        this.maintenanceService.deleteMaintenance(this.id);  
    }else if((edger == 0 && mow == 0 && plantsRemove == 0 && trimming == 0 && weedeater == 0) ||
            (this.edger == edger && this.mow == mow && this.plantsRemove == plantsRemove && this.trimming == trimming &&
            this.weedeater == weedeater)){ //nothing was added  or changed --- don't delete or change or add
        return; 
    }else if(this.id != null){ //update only
        let maintenance = {
            date: this.date,
            edger: edger,
            mow: mow,
            plantsRemove: plantsRemove,
            trimming: trimming,
            weedeater: weedeater
        }
        this.maintenanceService.updatingMaintenance(this.id, maintenance); 
    }else{
        let maintenance = {
            date: this.date,
            edger: edger,
            mow: mow,
            plantsRemove: plantsRemove,
            trimming: trimming,
            weedeater: weedeater
        }
        this.maintenanceService.addMaintenance(this.park, maintenance);
    }
  }
}
