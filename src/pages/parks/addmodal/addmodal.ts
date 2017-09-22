import { Component } from '@angular/core';
import { ParkService } from '../../../services/park.service'; 
import { ViewController } from 'ionic-angular';
@Component({
  selector: 'page-addmodal',
  templateUrl: 'addmodal.html'
})
export class AddModal {
  selectedValue = null; 
  constructor(public viewCtrl: ViewController, 
              private firebaseService: ParkService) {}
  
  closeModal(){
    this.viewCtrl.dismiss(); 
  }
  addPark(){
    let parkItem = {
      park: this.selectedValue
    }
    this.firebaseService.addPark(parkItem); 
    this.closeModal(); 
  }
}
