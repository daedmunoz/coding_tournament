import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ENDPOINTS } from "../endpoints";
import { EventType } from '../../models/event-type';
import { Filter } from '../../models/filter';
import { EventsFilter } from '../../models/events-filter';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) { }

  public getAllEvents(eventsFilter: EventsFilter = null) {
    let params = new HttpParams();
    if (eventsFilter) {
      if (eventsFilter.type) {
        params = params.append('type', eventsFilter.type);
      }

      if (eventsFilter.period) {
        params = params.append('period', eventsFilter.period);
      }
      if (eventsFilter.skip) {
        params = params.append('skip', '' + eventsFilter.skip);
      }
    }

    //  params = params.append("eventName", "" + filter.eventName);
    return this.http
      .get(ENDPOINTS.events.getAll, { params: params })
      .toPromise();
  }

  public createEvent(event: Event) {
    return this.http
      .post(ENDPOINTS.events.getAll, event)
      .toPromise();
  }

  public getEventTypes() {
    const eventTypes = [];
    const event1 = new EventType();
    event1._id = '1';
    event1.name = 'Robo';

    const event2 = new EventType();
    event2._id = '2';
    event2.name = 'Borrachera';

    eventTypes.push(event1);
    eventTypes.push(event2);

    return Promise.resolve(eventTypes);
  }
}
