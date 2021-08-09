import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PieData } from 'src/app/interfaces/PieData';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  timeTable: BehaviorSubject<Array<PieData>> = new BehaviorSubject<Array<PieData>>
    ([
      { name: 'Study', value: 0 },
      { name: 'Events', value: 0 },
      { name: 'Sleep', value: 0 },
      { name: 'Free', value: 1440 },
    ]);

  constructor() { }


  getTimeTable(): Observable<PieData[]> {
    return this.timeTable.asObservable();
  }

  updateTimeTable(data: PieData[]): void {
    this.timeTable.next(data);
  }

  clearTimeTable(): void {
    this.timeTable.next([]);
  }

  addTimeColumn(dataObj: PieData): void {
    const currentTable = this.timeTable;
    const updatedTable = [...currentTable.value, dataObj];
    this.timeTable.next(updatedTable);
  }


}
