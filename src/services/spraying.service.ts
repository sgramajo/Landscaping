import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class SprayingService {
  events: FirebaseListObservable<any[]>;
  park: FirebaseObjectObservable<any>;
  constructor(private db: AngularFireDatabase) {}

  getEvents(park){
    this.events = this.db.list('/Spraying Schedule/' + park) as FirebaseListObservable<Events[]>;
    return this.events; 
  }
  deleteEvent(id){
    this.events.remove(id);
  }
  addEvent(park, item){
    let database = firebase.database().ref('Spraying Schedule/' + park); 
    let string = item.getMonth() + "/" +  item.getDate() + "/" + item.getFullYear();  
    return database.push(string); 
  }
}
 
interface Events{
  $key?:string; 
  date?:string; 
}