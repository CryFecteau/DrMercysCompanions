import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product.model";
import { ApiDataService } from "./api-data.service";

@Injectable({
    providedIn: 'root',
})
export class ProductStoreService {
    private productArraySubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    public productArray$: Observable<Product[]> = this.productArraySubject.asObservable();
    private originalProducts: Product[] = [];

    constructor(private apiDataService: ApiDataService) {
        this.fetchProducts();
    }

    private fetchProducts(): void {
        this.apiDataService.getProducts().subscribe(
            (products: Product[]) => {
                this.originalProducts = products;
                this.productArraySubject.next(products);
            },
            (error) => {
                console.error("Error fetching products", error);
            }
        );
    }

    public searchProductsByName(searchTerm: string): void {
        if (searchTerm === '') {
            this.productArraySubject.next(this.originalProducts);
            return;
        }

        const filteredProducts: Product[] = this.originalProducts.filter((product: Product) => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        this.productArraySubject.next(filteredProducts);
    }

    public filterProductsByCategory(filterCategory: string): void {
        if (filterCategory === 'all') {
            this.productArraySubject.next(this.originalProducts);
            return;
        }

        const filteredProducts: Product[] = this.originalProducts.filter((product: Product) => {
            return product.category === filterCategory;
        });

        this.productArraySubject.next(filteredProducts);
    }

    public sortProducts(sortBy: string): void {
        let sortedProducts: Product[] = [...this.originalProducts];

        switch (sortBy) {
            case 'none':
                sortedProducts = [...this.originalProducts];
                break;
            case 'name':
                sortedProducts = sortedProducts.sort((a: Product, b: Product) => {
                    return a.name.localeCompare(b.name);
                });
                break;
            case 'price':
                sortedProducts = sortedProducts.sort((a: Product, b: Product) => {
                    return a.price - b.price;
                });
                break;
        }

        this.productArraySubject.next(sortedProducts);
    }

}
