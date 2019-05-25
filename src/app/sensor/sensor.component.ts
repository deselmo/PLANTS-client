import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  @Input() name: string;
  @Input() events: IEvent[] = [{ from: "1", to: "2" }, { from: "3", to: "4" }, { from: "any", to: "any" }];
  @Input() measures: IMeasure[] = [{ value: "1", time: "00:00 01/01/19" }, { value: "3", time: "00:00 01/01/19" }, { value: "2", time: "00:00 01/01/19" }];

  options_sensing_rate: FormGroup;
  options_add_event: FormGroup;
  options: FormGroup;


  constructor(fb: FormBuilder) {
    this.options_sensing_rate = fb.group({
      color: 'primary',
      sensing_rate: [1000, Validators.min(100)],
    });
    this.options_add_event = fb.group({
      color: 'primary',
      to: ["any"],
      from: ["any"],
    });
    this.options = fb.group({
      color: 'primary',
      value: [0],
      time: [0],
    });
  }

  ngOnInit() {
  }
}
