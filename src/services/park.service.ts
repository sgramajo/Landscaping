import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class ParkService {
  parks: FirebaseListObservable<any[]>;
  park: FirebaseObjectObservable<any>;
  constructor(private db: AngularFireDatabase) {}

  getParks(){
    this.parks = this.db.list('/Parks') as FirebaseListObservable<Parks[]>;
    return this.parks; 
  }
  getParkDetails(id){
    this.park = this.db.object('/Parks/'+id) as FirebaseObjectObservable<Parks>
    console.log(this.park); 
    return this.park;
  }
  updatingPark(id, park){
    this.parks.update(id, { park: park }); 
  }
  deletePark(id){
    this.parks.remove(id);
  }
  addPark(item){
    let database = firebase.database().ref('Parks');
    return database.push(item); 
  }
}

interface Parks{
  $key?:string; 
  park?:string; 
}