import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'

import { Plant, PlantsService } from './api/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'P.L.A.N.T.S.';
  
  plants: Plant[] = [];
  
  plantsService: PlantsService;

  constructor(plantsService: PlantsService) {
    this.plantsService = plantsService;
  }

  ngOnInit(): void {
    this.plantsService.getPlants().subscribe(x => this.updateUi(x, this.plants));
  }

  updateUi(plants: Plant[], internalPlants: Plant[]) {
    internalPlants.push.apply(internalPlants, plants);
  }
}
