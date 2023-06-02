import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  bannerImg: any;
  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getAssets().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id === 'homeBanner' ? this.bannerImg = data[i].img : null;
      }
    });
  }

  scrollToElement() {
    const element = document.getElementById('store-info-container');

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offsetTop = elementRect.top + window.pageYOffset;
      const offsetLeft = elementRect.left + window.pageXOffset;
      const elementCenterX = offsetLeft + element.offsetWidth / 2;
      const elementCenterY = offsetTop + element.offsetHeight / 2;

      window.scrollTo({
        top: elementCenterY - window.innerHeight / 2,
        left: elementCenterX - window.innerWidth / 2,
        behavior: 'smooth'
      });
    }
  }

}
