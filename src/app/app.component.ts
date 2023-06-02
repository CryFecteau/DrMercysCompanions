import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

  constructor() {
    // const aCollection = collection(this.firestore, '/products');
    // this.items$ = collectionData(aCollection);
    // this.items$.subscribe((data) => {
    //   console.log('dd', data);
    // });
  }
}
