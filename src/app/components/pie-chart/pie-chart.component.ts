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
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

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

  ngOnDestroy(): void {
    this.timeTableSubscription.unsubscribe();
  }
}
