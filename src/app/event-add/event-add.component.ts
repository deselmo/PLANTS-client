import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EventService } from '../api/index'
import { SensorComponent } from '../sensor/sensor.component';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  @Input() sensorComponent: SensorComponent;

  options_add_event: FormGroup;

  eventService: EventService;

  constructor(fb: FormBuilder, eventService: EventService) {
    this.eventService = eventService;

    this.options_add_event = fb.group({
      color: 'primary',
      from: [],
      to: [],
      communicate_to: [''],
    });

    this.options_add_event.controls['from'].setValidators([
      (control: AbstractControl) => Validators.max(this.options_add_event.controls['to'].value)(control)
    ])
    this.options_add_event.controls['to'].setValidators([
      (control: AbstractControl) => Validators.min(this.options_add_event.controls['from'].value)(control)
    ])
  }

  ngOnInit() {
  }

  send_add_event() {
    let data = {'sensor': this.sensorComponent.sensor.sensor};

    if(this.options_add_event.controls['to'].value != undefined) {
      data['max_value'] = this.options_add_event.controls['to'].value;
    }

    if(this.options_add_event.controls['from'].value != undefined) {
      data['min_value'] = this.options_add_event.controls['from'].value;
    }

    this.eventService.subscribe(this.sensorComponent.sensor.microbit,{
        'data': data,
        'microbit': this.sensorComponent.sensor.microbit,
        'return_address': this.options_add_event.controls['communicate_to'].value
      }).subscribe(() => this.on_add_event(this));
  }

  on_add_event(this_: EventAddComponent) {
    this_.sensorComponent.update_events();
    this_.options_add_event.controls['from'].setValue(undefined);
    this_.options_add_event.controls['to'].setValue(undefined);
    this_.options_add_event.controls['communicate_to'].setValue('');
  }
}
