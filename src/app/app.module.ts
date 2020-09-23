import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ObservationsComponent } from './observations/observations.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ObservingListComponent } from './observing-list/observing-list.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { SitesComponent } from './sites/sites.component';
import { FovIndicatorsComponent } from './fov-indicators/fov-indicators.component';
import { TelescopesComponent } from './equipment/telescopes/telescopes.component';
import { TelescopeDetailsComponent } from './equipment/telescopes/telescope-details/telescope-details.component';
import { TelescopeNewComponent } from './equipment/telescopes/telescope-new/telescope-new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemsComponent } from './equipment/items/items.component';
import { ItemsListComponent } from './equipment/items/items-list/items-list.component';
import { ItemsDetailsComponent } from './equipment/items/items-details/items-details.component';
import { ItemsNewComponent } from './equipment/items/items-new/items-new.component';
import { NgImageSliderModule } from 'ng-image-slider';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    HeaderComponent,
    SideMenuComponent,
    ObservationsComponent,
    SessionsComponent,
    ObservingListComponent,
    EquipmentComponent,
    SitesComponent,
    FovIndicatorsComponent,
    TelescopesComponent,
    TelescopeDetailsComponent,
    TelescopeNewComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemsDetailsComponent,
    ItemsNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
