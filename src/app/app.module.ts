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
import { EquipmentComponent } from './equipment/equipment.component';
import { SitesComponent } from './sites/sites.component';
import { FovIndicatorsComponent } from './fov-indicators/fov-indicators.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemsComponent } from './equipment/items/items.component';
import { ItemsListComponent } from './equipment/items/items-list/items-list.component';
import { ItemsDetailsComponent } from './equipment/items/items-details/items-details.component';
import { ItemsNewComponent } from './equipment/items/items-new/items-new.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SitesListComponent } from './sites/sites-list/sites-list.component';
import { SitesNewComponent } from './sites/sites-new/sites-new.component';
import { SitesDetailsComponent } from './sites/sites-details/sites-details.component';
import { ObservationListsComponent } from './observation-lists/observation-lists.component';
import { ListsDetailsComponent } from './observation-lists/lists-details/lists-details.component';
import { ListsNewComponent } from './observation-lists/lists-new/lists-new.component';
import { ListsListComponent } from './observation-lists/lists-list/lists-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    HeaderComponent,
    SideMenuComponent,
    ObservationsComponent,
    SessionsComponent,
    EquipmentComponent,
    SitesComponent,
    FovIndicatorsComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemsDetailsComponent,
    ItemsNewComponent,
    SitesListComponent,
    SitesNewComponent,
    SitesDetailsComponent,
    ObservationListsComponent,
    ListsDetailsComponent,
    ListsNewComponent,
    ListsListComponent
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
