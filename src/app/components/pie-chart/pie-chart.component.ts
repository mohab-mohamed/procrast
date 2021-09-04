import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PieData } from 'src/app/interfaces/PieData';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';
import { single } from "./data";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.sass']
})
export class PieChartComponent implements OnInit, OnDestroy {
  data!: PieData[];
  single!: any[];
  // view: [number, number] = [900, 900];
  timeTableSubscription!: Subscription;

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  customColors = [
    {
      name: 'Free',
      value: '#C7E3A4'
    },
    {
      name: 'Sleep',
      value: '#C8E4F4'
    },
    {
      name: 'Events',
      value: '#FEC9C9'
    }

  ];

  constructor(private timeTableService: TimeTableService) {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.timeTableSubscription = this.timeTableService.getTimeTable().subscribe(timeTable => {
      this.data = [...timeTable]
      console.log('pie', this.data);
    });
  }

  onSelect(data: any): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  toolTipFormat(e: any, e2: any) {
    console.log(e);
    e.data.label = 'TEST'
  }

  minutesToText(num: number) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    const hourNumber = (hours == 0) ? '' : hours;
    const hourLabel = (hours == 1) ? 'hour' : (hours == 0) ? '' : 'hours'
    const betweenLabel = (hours > 0 && minutes > 0) ? ' and ' : '';
    const minuteNumber = (minutes == 0) ? '' : minutes;
    const minuteLabel = (minutes == 1) ? 'minute' : (minutes == 0) ? '' : 'minutes';
    return hourNumber + ' ' + hourLabel + betweenLabel + minuteNumber + ' ' + minuteLabel;
  }

  ngOnDestroy(): void {
    this.timeTableSubscription.unsubscribe();
  }
}
