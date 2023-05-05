import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss'],
})
export class ProductStoreComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
