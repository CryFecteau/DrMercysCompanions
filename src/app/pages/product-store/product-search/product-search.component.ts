import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from 'src/app/services/product.store.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchText!: string;

  constructor(private productStoreService: ProductStoreService) { }

  ngOnInit(): void {
  }

  onSearchUpdate(): void {
    this.productStoreService.searchProductsByName(this.searchText);
  }

  onFilterChange(filterBy: string): void {
    this.productStoreService.filterProductsByCategory(filterBy);
  }

  onSortChange(sortBy: string): void {
    this.productStoreService.sortProducts(sortBy);
  }

}
