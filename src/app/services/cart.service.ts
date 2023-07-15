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
        console.log('Adding to cart:', item);
        const cart = this.cartItems.getValue();
        const foundItemIdx = cart.items.findIndex((x) => x.id === item.id);

        if (foundItemIdx > -1) {
            console.log('increase');
            cart.items[foundItemIdx].quantity += 1;
        } else {
            console.log('add');
            cart.items.push(item);
        }

        this.cartItems.next(cart);
        this._snackBar.open('Item added to cart', 'Close', { duration: 3000 });
        console.log(this.cartItems.getValue());
    }

    removeItemFromCart(item: CartItem): CartItem[] {
        // Know Bug: when removing an item with a quanity higher than 1, that item quantity does not reset to 0
        const filteredItems = this.cartItems.getValue().items.filter((x) => x.id !== item.id);


        console.log('filteredItems', filteredItems);
        if (filteredItems.length === 0) {
            this.cartItems.next({ items: filteredItems });
            this._snackBar.open('Item has been removed', 'Close', { duration: 3000 });
        }

        return filteredItems;
    }

    reduceItemQuantity(item: CartItem): void {
        console.log('reduce');
        let itemForRemoval!: CartItem;
        let filteredItems = this.cartItems.getValue().items.map((x) => {
            if (x.id === item.id) {
                x.quantity--;
                this._snackBar.open('Item quantity reduced', 'Close', { duration: 3000 });
                if (x.quantity === 0) {
                    itemForRemoval = x;
                }
            }
            return x;
        });

        if (itemForRemoval) {
            filteredItems = this.removeItemFromCart(itemForRemoval);
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
