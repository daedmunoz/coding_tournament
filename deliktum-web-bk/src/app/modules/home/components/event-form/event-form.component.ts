import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { EventsService } from '../../../../services/events/events.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  @Input() form: FormGroup;  
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  public eventTypes = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.retriveInitParameters();
  }

  public retriveInitParameters() {
    this.eventsService.getEventTypes().then(eventTypes => this.eventTypes = eventTypes).catch(err => {
      console.error(err);
    })
  }

  public saveEvent(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    const event = this.form.value;

    this.eventsService.createEvent(event).then(event => {
      formDirective.resetForm();
      this.form.reset();
      this.onSave.emit(event);
    }).catch(error => {
      console.error('Horror created', error);
    });
  }

  public cancel() {
    this.onCancel.emit();
  }
}
