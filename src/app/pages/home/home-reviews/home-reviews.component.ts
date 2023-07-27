import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

interface Review {
  product: string,
  review: string,
  author: string,
}

@Component({
  selector: 'app-home-reviews',
  templateUrl: './home-reviews.component.html',
  styleUrls: ['./home-reviews.component.scss']
})
export class HomeReviewsComponent implements OnInit {
  reviewData: Review[] = [];
  showNext = false;
  reviewSet = [0, 1, 2]

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getReviews().subscribe((reviews) => {
      this.reviewData = reviews;
    });
  }

  toggleReviews() {
    this.showNext = !this.showNext;

    if (this.showNext) {
      this.reviewSet = [3, 4, 5]
    } else {
      this.reviewSet = [0, 1, 2]
    }
  }
}
