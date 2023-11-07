import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastController
  ) { }

  toastMessage(message: string){
    this.toast.create({
      message,
      duration: 2000,
      position: 'top',
    }).then((data) => data.present());
  }
}
