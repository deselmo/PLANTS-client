import { Component, OnInit, Input } from '@angular/core';
import { SensorComponent } from '../sensor/sensor.component';
import { Event, EventService } from '../api/index'

@Component({
  selector: 'app-event-remove',
  templateUrl: './event-remove.component.html',
  styleUrls: ['./event-remove.component.scss']
})
export class EventRemoveComponent implements OnInit {
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

  on_send_remove_event(result: string, this_: EventRemoveComponent) {
    this_.sensorComponent.update_events();
  }
}
