import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { GoogleService } from '../../services/google/google.service';

import { fromEvent, Observable, Subscription, interval, TimeInterval } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  colorInterval!: Subscription;


  radius: number = 15;
  color: string = 'pink';

  leftCaret: boolean = false;
  resizeObservable$!: Observable<Event | any>;
  resizeSubscription$!: Subscription;

  mobile: boolean = true;
  constructor(private googleService: GoogleService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(this.cookieService.check('MYzKBlSitQ')) {
      this.router.navigate(['/dashboard']);
    }
    this.colorInterval = interval(300).subscribe(x => this.color = this.getRandomColor());
    if (window.innerWidth > 500) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      if (evt.target.innerWidth > 500) {
        this.mobile = false;
      } else {
        this.mobile = true;
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#69';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  grabUser() {
    if(this.cookieService.check('MYzKBlSitQ')) {
      this.router.navigate(['/dashboard']);
    } else {
      this.googleService.getUser();
    }
  }

  login() {
    this.grabUser();
  }

  changeCaret(): void {
    this.leftCaret = !this.leftCaret
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }
}
