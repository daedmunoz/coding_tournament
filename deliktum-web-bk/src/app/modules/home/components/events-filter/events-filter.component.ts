import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../../../../models/filter';
import { EventsService } from '../../../../services/events/events.service';
import { TranslateService } from "@ngx-translate/core";
import { EventsFilter } from '../../../../models/events-filter';
import * as _ from 'lodash';
import { EventType } from '../../../../models/event-type';

@Component({
  selector: 'app-events-filter',
  templateUrl: './events-filter.component.html',
  styleUrls: ['./events-filter.component.css']
})
export class EventsFilterComponent implements OnInit {
  @Output() onEventSelected = new EventEmitter<Event>();

  public periodFilters = [];
  public form: FormGroup;
  public eventTypes = [];
  public eventTypesAsObject = {};
  public events = [];
  public totalEvents = 0;

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.retriveInitParameters();
    this.initFilters();
    this.initForm();
  }

  public retriveInitParameters() {
    this.eventsService.getEventTypes().then((eventTypes: Array<EventType>) => {

       this.eventTypes = eventTypes;
       this.eventTypesAsObject = _.keyBy(this.eventTypes, '_id');
       console.log(this.eventTypesAsObject);
       }).catch(err => {
      console.error(err);
    })
  }

  private initFilters() {
    this.translateService.get('all').subscribe(() => {
      this.periodFilters = [];
      const filterAll = new Filter();
      filterAll.id = 'all';
      filterAll.value = this.translateService.instant('all');

      const filterToday = new Filter();
      filterToday.id = 'today';
      filterToday.value = this.translateService.instant('today');


      const filterLastWeek = new Filter();
      filterLastWeek.id = 'last-week';
      filterLastWeek.value = this.translateService.instant('last-week');

      const filterLastMonth = new Filter();
      filterLastMonth.id = 'last-month';
      filterLastMonth.value = this.translateService.instant('last-month');

      const filterLastYear = new Filter();
      filterLastYear.id = 'last-year';
      filterLastYear.value = this.translateService.instant('last-year');

      this.periodFilters.push(filterAll);
      this.periodFilters.push(filterToday);
      this.periodFilters.push(filterLastWeek);
      this.periodFilters.push(filterLastMonth);
      this.periodFilters.push(filterLastYear);
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      period: ['all'],
      type: ['all'],
    });
  }

  public filter(skip: number = null) {
    const eventFilter: EventsFilter = this.form.value;
    if (eventFilter.type === 'all') {
      eventFilter.type = null;
    }
    eventFilter.skip = skip;
    this.eventsService.getAllEvents(eventFilter)
      .then((response: any) => {
        if (skip > 0) {
          for (let e of response.data) {
            this.events.push(e);
          }
        } else {
          this.events = response.data;
        }

        this.totalEvents = response.total;
      })
      .catch(error => console.log(error));
  }

  public loadNextEvents() {
    this.filter(this.events.length);
  }

  selectEvent(event: Event) {
    this.onEventSelected.emit(event);
  }
}
