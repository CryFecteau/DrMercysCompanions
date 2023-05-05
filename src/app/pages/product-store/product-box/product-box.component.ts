import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  @Output() addToCart = new EventEmitter<Product>();

  product: Product = {
    id: 100,
    category: 'Test',
    name: 'Test',
    image: 'https://placehold.co/200',
    price: 10,
    description: 'Test',
    quantity: 1,
  };

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    console.log('Add to cart');
    this.addToCart.emit(this.product);
  }
}
