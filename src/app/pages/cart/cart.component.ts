import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };
  categoryMap: Record<string, string> = {
    workforce: 'Workforce',
    healthWellness: 'Health & Wellness',
    homeAssistants: 'Home Assistants',
    entertainment: 'Entertainment',
    sustainableLiving: 'Sustainable Living',
  };
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((_cart) => {
      this.cart = _cart;
    });
  }

  getCatergoryName(category: string): string {
    return this.categoryMap[category] || category;
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeItemFromCart(item);
  }

  onReduceQuantity(item: CartItem): void {
    this.cartService.reduceItemQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  selectedItem: any;

  openModal(item: any) {
    this.selectedItem = item;
  }

  modalClose(isclose: any) {
    if (isclose) {
      this.selectedItem = null
    }
  }

}
