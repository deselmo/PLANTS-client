import { Component, OnInit } from '@angular/core';

import { Plant, PlantsService } from './api/index'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AppComponent ]
})
export class AppComponent implements OnInit {
  title = 'P.L.A.N.T.S.';
  
  plants: Plant[] = [];
  
  plantsService: PlantsService;

  ip_address: string = "";

  constructor(protected httpClient: HttpClient, plantsService: PlantsService) {
    this.plantsService = plantsService;

    httpClient.get<string>("http://192.168.50.1:4201/my-ip")
      .subscribe(x => this.save_ip_address(x, this));
  }

  save_ip_address(ip_address: string, this_: AppComponent) {
    this_.ip_address = ip_address;
    this.updatePlants();
  }

  ngOnInit(): void { }

  updatePlants() {
    this.plantsService.getPlants().subscribe(x => this.on_updatePlants(x, this));
  }

  on_updatePlants(plants: Plant[], this_: AppComponent) {
    this_.plants = plants;
  }
}
