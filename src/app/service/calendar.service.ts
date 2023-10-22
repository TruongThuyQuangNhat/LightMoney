import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private eventSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public eventSource$ = this.eventSource.asObservable();

  constructor() { }

  addEvent(event: any) {
    this.eventSource.next(event);
  }

  getEvents() {
    return this.eventSource.getValue();
  }

}
