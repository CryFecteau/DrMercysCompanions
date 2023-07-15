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
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((_cart) => {
      console.log('Cart updated2:', _cart);
      this.cart = _cart;
    });
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
    console.log(this.cart)
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
