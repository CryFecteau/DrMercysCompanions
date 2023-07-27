import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductStoreService } from 'src/app/services/product.store.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  @Output() addToCart = new EventEmitter<Product>();
  productArray: Product[] = [];
  selectedItem: any;
  categoryMap: Record<string, string> = {
    workforce: 'Workforce',
    healthWellness: 'Health & Wellness',
    homeAssistants: 'Home Assistants',
    entertainment: 'Entertainment',
    sustainableLiving: 'Sustainable Living',
  };

  constructor(private cartService: CartService, private productStoreService: ProductStoreService) { }

  ngOnInit(): void {
    this.productStoreService.productArray$.subscribe((products) => {
      this.productArray = products;
    })
  }

  getCatergoryName(category: string): string {
    return this.categoryMap[category] || category;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  openModal(item: Product): void {
    this.selectedItem = item;
  }

  modalClose(isclose: boolean): void {
    if (isclose) {
      this.selectedItem = null
    }
  }
}
