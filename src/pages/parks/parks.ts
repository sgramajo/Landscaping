import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkService } from '../../services/park.service'; 
import { ModalController } from 'ionic-angular';
import { AddModal } from '../parks/addmodal/addmodal';
import { EditComponent } from './editmodal/edit.component';
import { DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'page-parks',
  templateUrl: 'parks.html'
})
export class ParksPage {
  parks: any; //when retrieving all parks
  park; //when retrieving one park
  id; //when retrieving one park
  parkAdd: any; //when adding a park into list
  constructor(public navCtrl: NavController, 
              private firebaseService: ParkService,
              private dialogService: DialogService, 
              public modalCtrl: ModalController) {}
  
  ngOnInit(){
    this.firebaseService.getParks().subscribe(parks =>{
      this.parks = parks;
    }); 
  }
  addModal(){
    let addModal = this.modalCtrl.create(AddModal);
    addModal.present();  
  }
  editModal(key, park){
    this.dialogService.addDialog(EditComponent, { 
      id: key, 
      parkString: park
    }); 
  }
  getPark(id){
    this.firebaseService.getParkDetails(id).subscribe(park =>{
      this.id = park.id; 
      this.park = park.park; 
    }); 
  }

}
