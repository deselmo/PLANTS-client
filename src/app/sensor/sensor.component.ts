import { Component, OnInit, Input, Injectable, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Sensor, SensorService, Event, EventService, Data, DataService } from '../api/index'

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

  sensorService: SensorService;
  eventService: EventService;
  dataService: DataService;

  events: Event[] = [];
  history: Data[] = [];

  options_sensing_rate: FormGroup;
  options_data: FormGroup;

  waiting_update_sampling_rate: boolean = false;
  waiting_update_history: boolean = true;

  constructor(
    fb: FormBuilder,
    sensorService: SensorService,
    eventService: EventService,
    dataService: DataService
  ) {
    this.sensorService = sensorService;
    this.eventService = eventService;
    this.dataService = dataService;

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
    this.options_sensing_rate.controls['sensing_rate'].setValue(this.sensor.sampling_rate / 100);
    this.update_events();
    this.update_history();
  }

  send_update_sampling_rate() {
    this.sensorService.updateSensingTime(
      this.sensor.microbit,
      this.sensor.sensor,
      this.options_sensing_rate.controls['sensing_rate'].value * 100
    ).subscribe(
      x => this.on_update_sampling_rate(x, this),
      x => this.on_update_sampling_rate_error(x, this));
  }

  on_update_sampling_rate(code: string, this_: SensorComponent) {
    if(code != "200") {
      this_.options_sensing_rate.controls['sensing_rate'].setValue(this_.sensor.sampling_rate / 100);
    }
    this_.waiting_update_sampling_rate = false;
  }

  on_update_sampling_rate_error(code: string, this_: SensorComponent) {
    this_.options_sensing_rate.controls['sensing_rate'].setValue(this_.sensor.sampling_rate / 100);
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

  update_history() {
    this.waiting_update_history = true;
    this.dataService.getData(this.sensor.microbit, this.sensor.sensor)
      .subscribe(x => this.on_update_history(x, this));
  }

  on_update_history(history: Data[], this_: SensorComponent) {
    this_.history = history;
    this_.waiting_update_history = false;
  }
}
