import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlantComponent implements OnInit {
  @Input() identificator: number;
  @Input() description: string;
  @Input() network: number;
  @Input() connected: boolean;
  @Input() sensors: string[];
  // @Input() sensors: string[] = ["Sensor 1","Sensor 2","Sensor 3"];

  link_state: string;

  constructor() {
  }

  ngOnInit() {
    if(this.connected) {
      this.link_state = "link";
    } else {
      this.link_state = "link_off";
    }
  }
}
