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
  waiting_refresh: boolean = true;

  constructor(protected httpClient: HttpClient, plantsService: PlantsService) {
    this.plantsService = plantsService;

    this.updatePlants();
  }

  ngOnInit(): void { }

  updatePlants() {
    this.plantsService.getPlants().subscribe(x => this.on_updatePlants(x, this));
  }

  on_updatePlants(plants: Plant[], this_: AppComponent) {
    this_.plants = plants;
    this_.waiting_refresh = false;
  }

  refresh() {
    this.waiting_refresh = true;
    this.updatePlants();
  }
}
