import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {
  @Input() itemDetails: any;
  @Input() isInCart: any;
  @Output() isModalClosed = new EventEmitter<any>();
  categoryMap: Record<string, string> = {
    workforce: 'Workforce',
    healthWellness: 'Health & Wellness',
    homeAssistants: 'Home Assistants',
    entertainment: 'Entertainment',
    sustainableLiving: 'Sustainable Living',
  };

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
  }

  getCatergoryName(category: string): string {
    return this.categoryMap[category] || category;
  }

  onAddToCart(): void {
    this.cartService.addToCart(this.itemDetails);
  }

  closeModal() {
    this.itemDetails = null;
    this.isModalClosed.emit(true);
  }

  stopPropagation(event: Event) {
    event.stopPropagation(); // Prevent click events on the modal content from closing the modal
  }
}
