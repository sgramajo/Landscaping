import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar'; 
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MaintenancePage } from '../pages/maintenance/maintenance';
import { SprayingPage } from '../pages/spraying/spraying';
import { ParksPage } from '../pages/parks/parks';
import { TabsPage } from '../pages/tabs/tabs';
import { NgCalendarModule  } from 'ionic2-calendar';
import { SettingsPage } from '../pages/settings/settings';
import { environment } from '../environments/environment';
import { AddModal } from '../pages/parks/addmodal/addmodal'; 
import { EditComponent } from '../pages/parks/editmodal/edit.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../pages/maintenance/confirm.component'; 
import { ParkService } from '../services/park.service';  
import { MaintenanceService } from '../services/maintenance.service'; 
import { NotificationsService } from '../services/notifications.service'; 
import { SettingsService } from '../services/settings.service'; 
import { SprayingService } from '../services/spraying.service'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage, 
    MaintenancePage, 
    SprayingPage, 
    ParksPage, 
    TabsPage, 
    AddModal,
    SettingsPage,
    EditComponent, 
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp), 
    CalendarModule.forRoot(), 
    NgCalendarModule,
    BootstrapModalModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage, 
    MaintenancePage, 
    ConfirmComponent,
    SprayingPage, 
    ParksPage,
    SettingsPage, 
    TabsPage, 
    AddModal, 
    EditComponent, 
  ],
  providers: [
    StatusBar,
    ParkService,
    MaintenanceService, 
    NotificationsService, 
    SettingsService, 
    SprayingService,
    AngularFireAuth,
    AngularFireDatabase,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
