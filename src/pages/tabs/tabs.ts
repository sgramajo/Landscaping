import { Component } from '@angular/core';
import { MaintenancePage } from '../maintenance/maintenance';
import { SprayingPage } from '../spraying/spraying';
import { ParksPage } from '../parks/parks';
import { NotificationsPage } from '../notifications/notifications'; 
import { SettingsPage } from '../settings/settings'; 

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
//this tells the tabs coponent which Pages 
//should be each tab's root Page
    tab1Root: any = MaintenancePage; 
    tab2Root: any = SprayingPage; 
    tab3Root: any = ParksPage; 
    tab4Root: any = NotificationsPage; 
    tab5Root: any = SettingsPage;
  constructor() {
  }

}
