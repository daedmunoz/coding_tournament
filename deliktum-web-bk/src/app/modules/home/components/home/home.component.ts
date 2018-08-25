import { Component, OnInit, NgZone } from '@angular/core';
import { Event } from '../../../../models/event';
import { Location } from '../../../../models/location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../../../services/events/events.service';
import * as _ from 'lodash';
import { EventType } from '../../../../models/event-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number = 0.1701601;
  lng: number = -78.4712387;
  public createNewEvent = false;
  public filtersPanelOpened = false;
  public eventTypesAsObject = {};

  public form: FormGroup;
  public eventSelected: Event;

  public events = [];
  public locationOfNewEvent = new Location();
  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.retriveInitParameters();
    this.initForm();
    this.retrieveEvents();
  }

  public retriveInitParameters() {
    this.eventsService.getEventTypes().then((eventTypes: Array<EventType>) => {
      this.eventTypesAsObject = _.keyBy(eventTypes, '_id');
      console.log(this.eventTypesAsObject);
    }).catch(err => {
      console.error(err);
    })
  }

  private initForm() {
    this.form = this.formBuilder.group({
      description: [null, Validators.required],
      type: [null, [Validators.required]],
      location: [null, [Validators.required]],
      dateTime: [null, [Validators.required]],
      image: [null]
    });
  }

  retrieveEvents() {
    this.eventsService.getAllEvents()
      .then((response: any) => this.events = response.data)
      .catch(error => console.error(error));
  }

  public showNewEventForm() {
    this.initForm();
    this.eventSelected = null;
    this.locationOfNewEvent = new Location();
    this.createNewEvent = true;
  }

  public hideNewEventForm() {
    this.createNewEvent = false;
  }

  public onEventSave(event: Event) {
    this.events.push(event);
    // this.createNewEvent = false;
    // this.initForm();    
    this.locationOfNewEvent = new Location();
    // this.createNewEvent = true;
  }

  public onEventSaveCancel() {
    this.createNewEvent = false;
  }

  public mapClicked(data) {
    if (this.createNewEvent) {
      this.locationOfNewEvent.latitude = data.coords.lat;
      this.locationOfNewEvent.longitude = data.coords.lng;
      this.form.controls.location.setValue(this.locationOfNewEvent);
    }
  }

  public onEventSelected(event: Event) {
    this.eventSelected = event;
    this.lat = event.location.latitude;
    this.lng = event.location.longitude;
  }

  public onOpenFiltersPanel() {
    this.eventSelected = null;
    this.filtersPanelOpened = true;
  }

  public onCloseFiltersPanel() {
    this.filtersPanelOpened = false;
  }
}
