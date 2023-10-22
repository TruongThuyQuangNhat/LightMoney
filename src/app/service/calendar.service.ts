import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  eventSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  addEvent(event: any) {
    const events = this.eventSource$.getValue();
    events.push(event);
    this.eventSource$.next(events);
  }

}
