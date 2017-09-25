import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { ParkService } from '../../services/park.service'; 
import { MaintenanceService } from '../../services/maintenance.service'; 
@Component({
  selector: 'page-maintenance',
  templateUrl: 'maintenance.html'
})
export class MaintenancePage {
  confirmResult:boolean = null;
  eventSource;
  viewTitle;
  selectedDate;
  selectedValue = null; 
  eventMaintenance = [];
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
  constructor(public navCtrl: NavController, 
              private firebaseService: ParkService,
              private maintenanceService : MaintenanceService, 
              private dialogService:DialogService) {

  }
  ngOnInit() {
    this.firebaseService.getParks().subscribe(parks =>{
      this.parks = parks;
      this.parks.sort((a, b) => { //alphbetical order
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
    var temp = this.valueKey.filter(x => x.date == String(date))[0];
    return temp; 
  }
  showConfirm() {
    var temp = this.searchArray(); 
    if(temp == null || temp == undefined){
      temp = {
        id: null, 
        edger: null, 
        trimming: null,  
        mow: null, 
        plantsRemove: null, 
        weedeater: null
      }; 
    }
    this.dialogService.addDialog(ConfirmComponent, {
      id: temp.$key, 
      date: this.selectedDate.getMonth() + "/" + this.selectedDate.getDate() + "/" + this.selectedDate.getFullYear(), 
      edger: temp.edger,
      trimming: temp.trimming,
      plantsRemove: temp.plantsRemove,
      mow: temp.mow,
      park: this.selectedValue, 
      weedeater: temp.weedeater})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
    });
  }
  getParks(park){
    this.maintenanceService.getMaintenance(park).subscribe(events =>{
      this.loadEvents(events); 
    });  
  }
  loadEvents(events) {
      this.eventMaintenance = []; 
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
      for (let event of arrayOfEvents) {
          let dateArray = event.date.split("/");
          this.valueKey.push(event); 
          var startTime = new Date(Date.UTC(dateArray[2], parseInt(dateArray[0]), dateArray[1]));
          var endTime = new Date(Date.UTC(dateArray[2], parseInt(dateArray[0]), parseInt(dateArray[1]) + 1));
          if(event.mow == 1){
            this.eventMaintenance.push({
                title: 'Mowing',
                startTime: startTime,
                endTime: endTime,
                allDay: true
            }); 
          }
          if(event.trimming == 1){
            this.eventMaintenance.push({
                title: 'Trimming',
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
          }
          if(event.plantsRemove == 1){
            this.eventMaintenance.push({
                title: 'Plants Removal',
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
          }
          if(event.edger == 1){
            this.eventMaintenance.push({
                title: 'Edger',
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
          }
          if(event.weedeater == 1){
            this.eventMaintenance.push({
                title: 'Weedeater',
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
          }
      }
     // console.log(this.valueKey); 
      return this.eventMaintenance;
  }


}
