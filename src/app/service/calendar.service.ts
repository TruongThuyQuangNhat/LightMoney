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

  updateEvent(event: any) {
    this.storage.get("ArrayEvent")?.then((data) => {
      const index = data.findIndex((item: any) => {
        return item.id === event.id;
      });
      if(index !== -1){
        data[index] = event;
        this.storage.set("ArrayEvent", data);
      }
    });
  }

  deleteEvent(id: string) {
    this.storage.get("ArrayEvent")?.then((data) => {
      const index = data.findIndex((item: any) => {
        return item.id === id;
      });
      if(index !== -1){
        data.splice(index, 1);

        // remove children
        const temp = data.filter((item: any) => {
          if(item.parentId === id){
            return item;
          }
        });

        temp.forEach((item: any) => {
          const index2 = data.findIndex((item2: any) => {
            return item2.id === item.id;
          });
          if(index2 !== -1){
            data.splice(index2, 1);
          }
        });
        
        this.storage.set("ArrayEvent", data);
      }
    });
  }

  loadChildren(id: string) {
    return this.storage.get("ArrayEvent")?.then((data) => {
      if(!data) return [];
      const temp = data.filter((item: any) => {
        if(item.parentId === id){
          return item;
        }
      });
      return temp;
    });
  }

  getCategories() {
    return this.storage.get("ArrayCategory");
  }

  setCategories(categories: any[]) {
    this.storage.set("ArrayCategory", categories);
  }
}
