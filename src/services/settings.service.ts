import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class SettingsService {
  monthlyemails: FirebaseListObservable<any[]>;
  monthlyemail: FirebaseObjectObservable<any>;

  weeklyemails: FirebaseListObservable<any[]>;
  weeklyemail: FirebaseObjectObservable<any>;

  weeklyNoti: FirebaseObjectObservable<any>; 
  constructor(private db: AngularFireDatabase) {}
  
  //first retrieving list or item to start the page 
  getMontlyEmails(){
    this.monthlyemails = this.db.list('/Monthly Emails') as FirebaseListObservable<Emails[]>;
    return this.monthlyemails; 
  }
  getWeeklyEmails(){
    this.weeklyemails = this.db.list('/Weekly Emails') as FirebaseListObservable<Emails[]>;
    return this.weeklyemails; 
  }
  getNoti(){
    this.weeklyNoti = this.db.object('/Weekly Notifications/') as FirebaseObjectObservable<Noti>
    return this.weeklyNoti;
  }

  //retrieving one specific item from the list
  getMontlyDetails(id){
    this.monthlyemail = this.db.object('/Monthly Emails/'+id) as FirebaseObjectObservable<Emails>
    return this.monthlyemail;
  }
  getWeeklyDetails(id){
    this.weeklyemail = this.db.object('/Weekly Emails/'+id) as FirebaseObjectObservable<Emails>
    return this.weeklyemail;
  }

  //updating item 
  updatingMontlyEmail(id, notification){
    this.weeklyNoti.update(notification); 
  }

  //deleting items from the list
  deleteMonthlyEmail(id){
    this.monthlyemails.remove(id);
  }
  deleteWeeklyEmail(id){
    this.weeklyemails.remove(id);
  }

  //add items to list
  addMonthlyEmail(item){
    let database = firebase.database().ref('Monthly Emails');
    return database.push(item); 
  }
  addWeeklyEmail(item){
    let database = firebase.database().ref('Weekly Emails');
    return database.push(item); 
  }
}

interface Emails{
  $key?:string; 
  email?:string; 
}
interface Noti{
  number?:number; 
}