import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { GoogleAuthResponse } from './google-user.interface';
import { CalendarEventsResponse } from 'src/app/interfaces/CalendarEventsResponse';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
    this.headers.set('Accept-Encoding', 'gzip, deflate, br');
    this.headers.set('Accept-Language', 'en-US,en;q=0.9');
  }

  getUser() {
    // now returns an Observable of Config
    return window.open("http://localhost:4200/api/google", "_self");
  }

  getCalendars(): Promise<any> {
    return this.http.get<any>("http://localhost:4200/api/google/calendars", { headers: this.headers }).toPromise();
  }

  getEvents(timeMin: string, timeMax: string): Promise<CalendarEventsResponse> {
    let timeParams = new HttpParams().set('timeMin', timeMin);
    timeParams = timeParams.set('timeMax', timeMax);
    return this.http.get<any>("http://localhost:4200/api/google/calendar", {params: timeParams }).toPromise();
  }




}
