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
import { EyepiecesComponent } from './equipment/eyepieces/eyepieces.component';
import { BinocularsComponent } from './equipment/binoculars/binoculars.component';
import { BarlowComponent } from './equipment/barlow/barlow.component';
import { FiltersComponent } from './equipment/filters/filters.component';
import { TelescopeDetailsComponent } from './equipment/telescopes/telescope-details/telescope-details.component';
import { TelescopeNewComponent } from './equipment/telescopes/telescope-new/telescope-new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';



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
    EyepiecesComponent,
    BinocularsComponent,
    BarlowComponent,
    FiltersComponent,
    TelescopeDetailsComponent,
    TelescopeNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
