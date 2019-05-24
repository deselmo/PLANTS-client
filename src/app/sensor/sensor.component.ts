import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SensorComponent implements OnInit {
  @Input() name: string;

  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'primary',
      fontSize: [1000, Validators.min(100)],
    });
  }

  ngOnInit() {
  }
}
