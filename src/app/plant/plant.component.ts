import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Plant, Sensor, SensorService } from '../api/index'

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlantComponent implements OnInit {
  @Input() plant: Plant;

  identificator: number;
  description: string;
  network: number;

  sensors: Sensor[] = [];

  connected: string;

  sensorService: SensorService;

  constructor(sensorService: SensorService) {
    this.sensorService = sensorService;
  }

  ngOnInit() {
    this.identificator = this.plant.microbit;
    this.description = this.plant.description;

    if(this.plant.connected) {
      this.connected = "link";
    } else {
      this.connected = "link_off";
    }

    this.sensorService.getSensors(this.identificator)
      .subscribe(x => this.updateUi(x, this.sensors));
  }

  updateUi(sensors: Sensor[], internalSensors: Sensor[]) {
    internalSensors.push.apply(internalSensors, sensors);
  }
}
