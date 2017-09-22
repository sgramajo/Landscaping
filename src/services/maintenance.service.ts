import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class MaintenanceService {
  maintenances: FirebaseListObservable<any[]>;
  park: FirebaseObjectObservable<any>;
  constructor(private db: AngularFireDatabase) {}

  getMaintenance(park){
    this.maintenances = this.db.list('/Maintenance Schedule/' + park) as FirebaseListObservable<Maintenance[]>;
    return this.maintenances; 
  }
  updatingMaintenance(id, maintenance){
    this.maintenances.update(id, maintenance); 
  }
  deleteMaintenance(id){
    this.maintenances.remove(id);
  }
  addMaintenance(park, item){
    let database = firebase.database().ref('Maintenance Schedule/' + park);
    return database.push(item); 
  }
}

interface Maintenance{
  $key?:string; 
  date?:string;
  edger?:number; 
  mow?:number; 
  plantsRemove?:number; 
  trimming?:number; 
  weedeater?:number; 
}