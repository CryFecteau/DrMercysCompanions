import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-home-store-info',
  templateUrl: './home-store-info.component.html',
  styleUrls: ['./home-store-info.component.scss']
})
export class HomeStoreInfoComponent implements OnInit {
  cookImg: any;
  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getAssets().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id === 'homeCook' ? this.cookImg = data[i].img : null;
      }
    });
  }

  scrollToElement() {
    const element = document.getElementById('home-company-info-container');

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
