import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  cart: Cart = { items: [] };
  itemsQuantity: number = 1;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((_cart) => {
      this.cart = _cart;
      this.itemsQuantity = _cart.items
        .map((item) => item.quantity)
        .reduce((prev, curent) => prev + curent, 0);
    });
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeItemFromCart(item);
  }

}
