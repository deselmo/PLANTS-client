import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Sensor, SensorService } from '../api/index'

interface IEvent {
  from: string;
  to: string;
}

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

  @Input() events: IEvent[] = [{ from: "1", to: "2" }, { from: "3", to: "4" }, { from: "any", to: "any" }];
  @Input() measures: IMeasure[] = [{ value: "1", time: "00:00 01/01/19" }, { value: "3", time: "00:00 01/01/19" }, { value: "2", time: "00:00 01/01/19" }];

  sensorService: SensorService;

  options_sensing_rate: FormGroup;
  options_add_event: FormGroup;
  options_data: FormGroup;

  waiting_update_sampling_rate: boolean = false;


  constructor(fb: FormBuilder, sensorService: SensorService) {
    this.sensorService = sensorService;

    this.options_sensing_rate = fb.group({
      sensing_rate: [Validators.min(0)],
    });
    this.options_add_event = fb.group({
      color: 'primary',
      to: ['any'],
      from: ['any'],
    });
    this.options_data = fb.group({
      color: 'primary',
      value: [],
      time: [],
    });
  }

  ngOnInit() { }

  send_update_sampling_rate() {
    let a = this.sensorService.updateSensingTime(
      this.sensor.microbit,
      this.sensor.sensor,
      this.options_sensing_rate.controls['sensing_rate'].value
    ).subscribe(x => this.update_sampling_rate(x, this));
  }

  update_sampling_rate(code: string, this_: SensorComponent) {
    if(code == "400") {
      this_.options_sensing_rate.controls['sensing_rate'].setValue(this_.sensor.sampling_rate);
    }
    this_.waiting_update_sampling_rate = false;
  }
}
