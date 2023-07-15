import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiDataService {
    title = 'DMC';
    firestore: Firestore = inject(Firestore);

    productData: any;
    assetData: any;
    reviewData: any;

    products$: Observable<any[]> | undefined;
    assets$: Observable<any[]> | undefined;
    reviews$: Observable<any[]> | undefined;

    constructor() { }

    getProducts(): Observable<any> {
        if (this.productData) {
            return of(this.productData);
        } else {
            const aCollection = collection(this.firestore, '/products');
            this.products$ = collectionData(aCollection);
            this.products$.subscribe((data) => {
                this.productData = data;
            });
            return this.products$;
        }
    }

    getAssets(): Observable<any> {
        if (this.assetData) {
            return of(this.assetData);
        } else {
            const aCollection = collection(this.firestore, '/assets');
            this.assets$ = collectionData(aCollection);
            this.assets$.subscribe((data) => {
                this.assetData = data;
            });
            return this.assets$;
        }
    }

    getReviews(): Observable<any> {
        if (this.reviewData) {
            return of(this.reviewData);
        } else {
            const aCollection = collection(this.firestore, '/reviews');
            this.reviews$ = collectionData(aCollection);
            this.reviews$.subscribe((data) => {
                this.reviewData = data;
            });
            return this.reviews$;
        }
    }
}