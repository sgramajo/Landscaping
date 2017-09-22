import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkService } from '../../services/park.service'; 
import { SprayingService } from '../../services/spraying.service'; 

@Component({
  selector: 'page-spraying',
  templateUrl: 'spraying.html'
})
export class SprayingPage implements OnInit {
    confirmResult:boolean = null;
    eventSource;
    viewTitle;
    selectedDate;
    selectedValue = null; 
    eventSpraying = [];
    valueKey = [];  
    isToday:boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    }; 
  parks: any; //when retrieving all parks 
  events:any; //when retrieving all events 
  constructor(public navCtrl: NavController, 
              private firebaseService: ParkService,
              private sprayService: SprayingService) {

  }
  ngOnInit() {
    this.firebaseService.getParks().subscribe(parks =>{
      this.parks = parks;
      this.parks.sort((a, b) => { //alphabetical order
        if (a.park.toLowerCase() < b.park.toLowerCase()) return -1;
        else if (a.park.toLowerCase() > b.park.toLowerCase()) return 1;
        else return 0;
      });
      this.selectedValue = this.parks[0].park;  
      this.getParks(this.selectedValue); 
    });
  }
  searchArray(){
    var date = this.selectedDate.getMonth() + "/" + this.selectedDate.getDate() + "/" + this.selectedDate.getFullYear(); 
    var temp = this.valueKey.filter(x => x.value == String(date))[0];
    return temp; 
  }
  addSpraying(){
    var temp = this.searchArray(); 
    if(temp == undefined || temp == null){ 
      this.sprayService.addEvent("arsdale", this.selectedDate);
    }
  }
  removeSpraying(){
    var temp = this.searchArray();   
    if(temp != undefined || temp != null){
      this.sprayService.deleteEvent(temp.key);
    }
  }
  getParks(park){
    this.sprayService.getEvents(park).subscribe(events =>{
      this.events = events; 
      this.loadEvents(this.events); 
    });  
  }
  loadEvents(events) {
      this.eventSpraying = []; 
      this.eventSource = this.createEvents(events);
  }

  onViewTitleChanged(title) {
      this.viewTitle = title;
  }

  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event:Date) {
      this.selectedDate = event;  
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

  createEvents(arrayOfEvents) {
      this.valueKey = []; 
      this.eventSpraying = []; 
      for (let event of arrayOfEvents) {
          let dateArray = event.$value.split("/");
          this.valueKey.push({ key: event.$key, value: event.$value }); 
          var startTime = new Date(Date.UTC(dateArray[2], parseInt(dateArray[0]), dateArray[1]));
          var endTime = new Date(Date.UTC(dateArray[2], parseInt(dateArray[0]), parseInt(dateArray[1]) + 1));
          this.eventSpraying.push({
              title: 'Spraying',
              startTime: startTime,
              endTime: endTime,
              allDay: true
          }); 
      }
      return this.eventSpraying;
  }

}
