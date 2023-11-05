import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { listCategory } from 'src/app/model/category';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private storage: StorageService,
  ) {
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.storage.get('ArrayCategory')?.then((data) => {
        if(!data) {
          this.storage.set('ArrayCategory', listCategory);
        }
      });
    }, 10);
  }

}
