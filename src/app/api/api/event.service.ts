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

import { Event } from '../model/event';
import { InlineResponse200 } from '../model/inlineResponse200';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class EventService {

    protected basePath = 'https://localhost:8080';
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
     * Register to sensors&#39; event
     * This can be done by 3rd party app
     * @param microbitId id of a plant
     * @param sensor name of a sensor
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getEvent(microbitId: number, sensor?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Event>>;
    public getEvent(microbitId: number, sensor?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Event>>>;
    public getEvent(microbitId: number, sensor?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Event>>>;
    public getEvent(microbitId: number, sensor?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (microbitId === null || microbitId === undefined) {
            throw new Error('Required parameter microbitId was null or undefined when calling getEvent.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sensor !== undefined && sensor !== null) {
            queryParameters = queryParameters.set('sensor', <any>sensor);
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
        ];

        return this.httpClient.get<Array<Event>>(`${this.basePath}/plants/${encodeURIComponent(String(microbitId))}/event`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Register to sensors&#39; event
     * This can be done by 3rd party app
     * @param microbitId id of a microbit
     * @param event event detail
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subscribe(microbitId: number, event: Event, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public subscribe(microbitId: number, event: Event, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public subscribe(microbitId: number, event: Event, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public subscribe(microbitId: number, event: Event, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (microbitId === null || microbitId === undefined) {
            throw new Error('Required parameter microbitId was null or undefined when calling subscribe.');
        }

        if (event === null || event === undefined) {
            throw new Error('Required parameter event was null or undefined when calling subscribe.');
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<InlineResponse200>(`${this.basePath}/plants/${encodeURIComponent(String(microbitId))}/event`,
            event,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Unregister to sensors&#39; event
     * This can be done by 3rd party app
     * @param eventId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unsubscribe(eventId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public unsubscribe(eventId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public unsubscribe(eventId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public unsubscribe(eventId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (eventId === null || eventId === undefined) {
            throw new Error('Required parameter eventId was null or undefined when calling unsubscribe.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/plants/event/${encodeURIComponent(String(eventId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
