import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    constructor(private _snackBar: MatSnackBar) { }

    cartItems = new BehaviorSubject<Cart>({ items: [] });

    addToCart(item: CartItem): void {
        const cart = this.cartItems.getValue();
        const foundItemIdx = cart.items.findIndex((x) => x.id === item.id);

        if (foundItemIdx > -1) {
            cart.items[foundItemIdx].quantity += 1;
        } else {
            cart.items.push(item);
        }

        this.cartItems.next(cart);
        this._snackBar.open('Item added to cart', 'Close', { duration: 3000 });
    }

    removeItemFromCart(item: CartItem): void {
        const cart = this.cartItems.getValue();
        const foundItemIdx = cart.items.findIndex((x) => x.id === item.id);

        cart.items[foundItemIdx].quantity = 1;

        const filteredItems = cart.items.filter((x) => x.id !== item.id);

        this.cartItems.next({ items: filteredItems });
        this._snackBar.open('Item has been removed', 'Close', { duration: 3000 });
    }

    reduceItemQuantity(item: CartItem): void {
        const cart = this.cartItems.getValue();
        const foundItemIdx = cart.items.findIndex((x) => x.id === item.id);

        if (cart.items[foundItemIdx].quantity > 1) {
            cart.items[foundItemIdx].quantity -= 1;
            this._snackBar.open('Item quantity reduced', 'Close', { duration: 3000 });
        } else {
            this.removeItemFromCart(item);
        }
    }

    clearCart(): void {
        this.cartItems.next({ items: [] });
        this._snackBar.open('Cart has been cleared', 'Close', { duration: 3000 });
    }

    getTotalPrice(): number {
        return this.cartItems.getValue().items
            .map((item) => item.price * item.quantity)
            .reduce((prev, current) => prev + current, 0);
    }

    getTotalItems(): number {
        return this.cartItems.getValue().items.map((item) => item.quantity)
            .reduce((prev, current) => prev + current, 0);
    }
}
