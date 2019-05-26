import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { DataService } from './api/data.service';
import { EventService } from './api/event.service';
import { PlantsService } from './api/plants.service';
import { SensorService } from './api/sensor.service';
import { SinkService } from './api/sink.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    DataService,
    EventService,
    PlantsService,
    SensorService,
    SinkService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
