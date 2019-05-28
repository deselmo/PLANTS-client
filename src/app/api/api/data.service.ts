/**
 * P.L.A.N.T.S. API
 * Provides functions to interact with P.L.A.N.T.S. systems
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Data } from '../model/data';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DataService {

    protected basePath = 'http://192.168.50.23:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get data of a plant
     * This can be done by 3rd party app
     * @param plantId id of a plant
     * @param sensor 
     * @param minValue 
     * @param maxValue 
     * @param minTime 
     * @param maxTime 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getData(plantId: number, sensor?: string, minValue?: number, maxValue?: number, minTime?: number, maxTime?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Data>>;
    public getData(plantId: number, sensor?: string, minValue?: number, maxValue?: number, minTime?: number, maxTime?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Data>>>;
    public getData(plantId: number, sensor?: string, minValue?: number, maxValue?: number, minTime?: number, maxTime?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Data>>>;
    public getData(plantId: number, sensor?: string, minValue?: number, maxValue?: number, minTime?: number, maxTime?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (plantId === null || plantId === undefined) {
            throw new Error('Required parameter plantId was null or undefined when calling getData.');
        }






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sensor !== undefined && sensor !== null) {
            queryParameters = queryParameters.set('sensor', <any>sensor);
        }
        if (minValue !== undefined && minValue !== null) {
            queryParameters = queryParameters.set('min_value', <any>minValue);
        }
        if (maxValue !== undefined && maxValue !== null) {
            queryParameters = queryParameters.set('max_value', <any>maxValue);
        }
        if (minTime !== undefined && minTime !== null) {
            queryParameters = queryParameters.set('min_time', <any>minTime);
        }
        if (maxTime !== undefined && maxTime !== null) {
            queryParameters = queryParameters.set('max_time', <any>maxTime);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Data>>(`${this.basePath}/plants/${encodeURIComponent(String(plantId))}/data`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
