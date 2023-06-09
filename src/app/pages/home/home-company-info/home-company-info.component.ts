import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-home-company-info',
  templateUrl: './home-company-info.component.html',
  styleUrls: ['./home-company-info.component.scss']
})
export class HomeCompanyInfoComponent implements OnInit {
  companionImg: any;
  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getAssets().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id === 'homeCompanions' ? this.companionImg = data[i].img : null;
      }
    });
  }

  scrollToElement() {
    const element = document.getElementById('quiz-info-container');

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
