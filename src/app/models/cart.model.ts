// interface for a single Product in the cart
export interface CartItem {
    id: number; // unique identifier
    name: string; // name of product
    image: string; // image of product
    price: number; // price of product
    quantity: number; // quantity of product
};

// interface for the cart array of cart items
export interface Cart {
    items: CartItem[]; // array of cart items
}