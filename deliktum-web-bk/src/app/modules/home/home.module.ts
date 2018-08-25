import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from "./home-routing.module.";
import { MatButtonModule } from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import { environment } from "../../../environments/environment";
import { TranslateModule } from "@ngx-translate/core";
import { EventFormComponent } from './components/event-form/event-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventsFilterComponent } from './components/events-filter/events-filter.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDividerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleProjectApiKey
    })
  ],
  declarations: [HomeComponent, EventFormComponent, EventsFilterComponent],
  providers: []
})
export class HomeModule { }
