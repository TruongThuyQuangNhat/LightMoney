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

  setEvent(event: any) {
    this.storage.get("ArrayEvent")?.then((data) => {
      data.push(event);
      this.storage.set("ArrayEvent", data);
    });
  }

  getCategories() {
    return this.storage.get("ArrayCategory");
  }

  setCategories(categories: any[]) {
    this.storage.set("ArrayCategory", categories);
  }
}
