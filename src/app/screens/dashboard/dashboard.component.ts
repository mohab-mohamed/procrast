import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GoogleService } from '../../services/google/google.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import dayjs from 'dayjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  day: number = 60 * 60 * 24 * 1000;
  rightCaret: boolean = true;
  resizeObservable$!: Observable<Event | any>;
  resizeSubscription$!: Subscription;

  mobile: boolean = true;

  dateInput!: Date;

  constructor(private googleService: GoogleService, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    if (window.innerWidth > 1365) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      if (evt.target.innerWidth > 1365) {
        this.mobile = false;
      } else {
        this.mobile = true;
      }
    });
  }

  onDateInput(event: MatDatepickerInputEvent<any>) {
    const day = dayjs(event.value).toISOString();
    let next = new Date();
    const nextday = dayjs(event.value).toDate();
    next = new Date(nextday.getTime() + this.day);
    const nextDay = next.toISOString()
    console.log(day, nextDay);
  }

  convertStringToDate(dateString: string) {

  }

  logout() {
    this.cookieService.delete('MYzKBlSitQ');
    this.router.navigate(['']);
  }


  switchCaret(): void {
    this.rightCaret = !this.rightCaret;
  }

  async grabCalendars() {
    const calendars = await this.googleService.getCalendars();
    console.log(calendars);
  }

}
