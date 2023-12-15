import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private storage: StorageService,
  ) { }

  getEvents() {
    return this.storage.get("ArrayEvent");
  }

  setEvents(events: any[]) {
    this.storage.set("ArrayEvent", events);
  }

  getCategories() {
    return this.storage.get("ArrayCategory");
  }

  setCategories(categories: any[]) {
    this.storage.set("ArrayCategory", categories);
  }
}
