import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Asset } from '../models/asset.model';
import { Review } from '../models/reviews.model';

@Injectable({
    providedIn: 'root',
})
export class ApiDataService {
    products$: Observable<any[]> | undefined;
    assets$: Observable<any[]> | undefined;
    reviews$: Observable<any[]> | undefined;

    constructor(private firestore: Firestore) { }

    getAllData(): Observable<[Product[], Asset[], Review[]]> {
        return combineLatest([
            this.getProducts(),
            this.getAssets(),
            this.getReviews()
        ]).pipe(
            map(([products, assets, reviews]) => [products, assets, reviews])
        );
    }

    getProducts(): Observable<any> {
        if (this.products$) {
            return this.products$;
        } else {
            const aCollection = collection(this.firestore, '/products');
            this.products$ = collectionData(aCollection).pipe(shareReplay(1));
            return this.products$;
        }
    }

    getAssets(): Observable<any> {
        if (this.assets$) {
            return this.assets$;
        } else {
            const aCollection = collection(this.firestore, '/assets');
            this.assets$ = collectionData(aCollection).pipe(shareReplay(1));
            return this.assets$;
        }
    }

    getReviews(): Observable<any> {
        if (this.reviews$) {
            return this.reviews$;
        } else {
            const aCollection = collection(this.firestore, '/reviews');
            this.reviews$ = collectionData(aCollection).pipe(shareReplay(1));
            return this.reviews$;
        }
    }
}
