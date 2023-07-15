import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  @Output() addToCart = new EventEmitter<Product>();
  productArray: Product[] = [];
  categoryMap: Record<string, string> = {
    workforce: 'Workforce',
    healthWellness: 'Health & Wellness',
    homeAssistants: 'Home Assistants',
    entertainment: 'Entertainment',
    sustainableLiving: 'Sustainable Living',
  };

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getProducts().subscribe((products) => {
      this.productArray = products;
      console.log(this.productArray);
    });
  }

  getCatergoryName(category: string): string {
    return this.categoryMap[category] || category;
  }

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
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
