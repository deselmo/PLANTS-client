import { Component, OnInit, Input } from '@angular/core';
import { SensorComponent } from '../sensor/sensor.component';
import { Event, EventService } from '../api/index'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Input() sensorComponent: SensorComponent;

  eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  ngOnInit() {
  }

  send_remove_event() {
    this.eventService.unsubscribe(this.event.id)
      .subscribe(x => this.on_send_remove_event(x, this));
  }

  on_send_remove_event(result: string, this_: EventComponent) {
    this_.sensorComponent.update_events();
  }
}
