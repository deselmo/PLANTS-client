import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlantComponent } from './plant/plant.component';
import { SensorComponent } from './sensor/sensor.component';
import { EventComponent } from './event/event.component';

import { ApiModule } from './api/api.module';
import { EventRemoveComponent } from './event-remove/event-remove.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantComponent,
    SensorComponent,
    EventComponent,
    EventRemoveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
