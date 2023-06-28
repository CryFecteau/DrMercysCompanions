import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {
  @Input() itemDetails: any;
  @Output() isModalClosed = new EventEmitter<any>();

  constructor() { }


  ngOnInit(): void {
  }

  closeModal() {
    this.itemDetails = null;
    this.isModalClosed.emit(true);
  }

  stopPropagation(event: Event) {
    event.stopPropagation(); // Prevent click events on the modal content from closing the modal
  }
}
