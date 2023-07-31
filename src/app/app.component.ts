import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'DMC';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]> | undefined;
  hasEntered = false;

  constructor() { }

  handleEnterSite(data: boolean) {
    this.hasEntered = data;
  }
}
