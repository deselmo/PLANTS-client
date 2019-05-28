import { Component, OnInit, Input, Injectable, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Sensor, SensorService, Event, EventService } from '../api/index'

interface IMeasure {
  value: string;
  time: string;
}

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SensorComponent implements OnInit {
  @Input() sensor: Sensor;
  @Input() measures: IMeasure[] = [{ value: "1", time: "00:00 01/01/19" }, { value: "3", time: "00:00 01/01/19" }, { value: "2", time: "00:00 01/01/19" }];

  sensorService: SensorService;
  eventService: EventService;

  events: Event[] = [];

  options_sensing_rate: FormGroup;
  options_data: FormGroup;

  waiting_update_sampling_rate: boolean = false;

  constructor(fb: FormBuilder, sensorService: SensorService, eventService: EventService) {
    this.sensorService = sensorService;
    this.eventService = eventService;

    this.options_sensing_rate = fb.group({
      sensing_rate: [Validators.required, Validators.min(0)],
    });
    this.options_data = fb.group({
      color: 'primary',
      value: [],
      time: [],
    });
  }

  ngOnInit() {
    this.update_events();
  }

  send_update_sampling_rate() {
    this.sensorService.updateSensingTime(
      this.sensor.microbit,
      this.sensor.sensor,
      this.options_sensing_rate.controls['sensing_rate'].value
    ).subscribe(
      x => this.on_update_sampling_rate(x, this),
      x => this.on_update_sampling_rate_error(x, this));
  }

  on_update_sampling_rate(code: string, this_: SensorComponent) {
    if(code != "200") {
      this_.options_sensing_rate.controls['sensing_rate'].setValue(this_.sensor.sampling_rate);
    }
    this_.waiting_update_sampling_rate = false;
  }

  on_update_sampling_rate_error(code: string, this_: SensorComponent) {
    this_.options_sensing_rate.controls['sensing_rate'].setValue(this_.sensor.sampling_rate);
    this_.waiting_update_sampling_rate = false;
  }

  update_events() {
    this.eventService.getEvent(
      this.sensor.microbit,
      this.sensor.sensor
    ).subscribe(x => this.on_update_events(x, this));
  }

  on_update_events(events: Event[], this_: SensorComponent) {
    this_.events = events;
  }
}
