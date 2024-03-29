import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GoogleService } from '../../services/google/google.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import dayjs from 'dayjs'
import { ItemsEntity } from 'src/app/interfaces/CalendarEventsResponse';
import { PieData } from 'src/app/interfaces/PieData';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';

import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from 'src/app/components/settings-dialog/settings-dialog.component';
import { Item } from 'src/app/interfaces/TaskListsResponse';
import { MatSelectChange } from '@angular/material/select';
import { TaskItemsEntity } from 'src/app/interfaces/TasksResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
  day: number = 60 * 60 * 24 * 1000;
  rightCaret: boolean = true;
  resizeObservable$!: Observable<Event | any>;
  resizeSubscription$!: Subscription;

  mobile: boolean = true;

  dateInput!: Date;

  events: ItemsEntity[] = [];
  timeTable!: PieData[];
  timeTableSubscription!: Subscription;

  lists: Item[] = [];
  selected!: string;
  listId: string = '';
  deadlines: TaskItemsEntity[] = [];
  constructor(
    private googleService: GoogleService,
    private router: Router,
    private cookieService: CookieService,
    private timeTableService: TimeTableService,
    public dialog: MatDialog
  ) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async ngOnInit(): Promise<void> {
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
    this.timeTableSubscription = this.timeTableService.getTimeTable().subscribe(timeTable => this.timeTable = timeTable);
    await this.googleService.getTaskLists().then(res => this.lists = res.listsData.items);
    if(this.lists.length > 0) {
      this.selected = this.lists[0].title;
      this.listId = this.lists[0].id;
    }

    console.log('lists', this.lists);
    this.getTasks();
  }

  async onDateInput(event: MatDatepickerInputEvent<any>) {
    const day = dayjs(event.value).toISOString();
    let next = new Date();
    const nextday = dayjs(event.value).toDate();
    next = new Date(nextday.getTime() + this.day);
    const nextDay = next.toISOString()
    console.log(day, nextDay);
    await this.googleService.getEvents(day, nextDay).then(res => { this.events = res.calendarsData.items! });
    this.calculateTotalEventTime(this.events);
  }

  calculateTotalEventTime(events: ItemsEntity[]) {
    let totalEventsTime = 0;
    events.forEach(e => { totalEventsTime += dayjs(e.end.dateTime).diff(dayjs(e.start.dateTime), 'minute') });
    let timeTable = this.timeTable;
    timeTable.forEach(column => {
      if (column.name === 'Events') {
        column.value = totalEventsTime;
      }
      if (column.name === 'Free') {
        column.value -= totalEventsTime;
      }
    })
    this.timeTableService.updateTimeTable(timeTable);
    console.log(this.timeTable);
  }

  logout() {
    this.cookieService.delete('MYzKBlSitQ');
    this.router.navigate(['']);
  }


  switchCaret(): void {
    this.rightCaret = !this.rightCaret;
  }

  async selectList(event: MatSelectChange) {
    this.listId = this.lists.find(list => list.title === event.value)!.id;
    if(this.listId) {
      this.getTasks();
    }
  }

  async getTasks() {
    const tasks = await this.googleService.getTasks(this.listId);
    console.log('tasks', tasks);
  }

  ngOnDestroy(): void {
    this.timeTableSubscription.unsubscribe();
  }

}
